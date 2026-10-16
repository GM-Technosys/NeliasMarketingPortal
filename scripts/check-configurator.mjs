import { plans, optionalCharges } from "../src/data/pricing-catalog.js";
import { toPlansById } from "../src/lib/configurator/plan-rules.js";
import { recommendPlan } from "../src/lib/configurator/recommend.js";
import { extensionCost, estimate } from "../src/lib/configurator/estimate.js";
import { defaultState, sanitizeState, encodeState, decodeState } from "../src/lib/configurator/model.js";

const plansById = toPlansById(plans);
const catalog = { plansById, optionalCharges };

let hasErrors = false;

function assert(condition, message) {
  if (condition) {
    console.log(`OK: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    hasErrors = true;
  }
}

console.log("=== CHECK CONFIGURATOR SUITE ===");

// 1. recommendPlan assertions
console.log("\n--- 1. recommendPlan ---");
const testRec = (u, e, s, expectedPlan, expectedReview = false) => {
  const res = recommendPlan({ users: u, entities: e, storage: s }, plansById);
  assert(
    res.planId === expectedPlan && res.needsReview === expectedReview,
    `recommendPlan(${u}, ${e}, ${s}) -> ${expectedPlan} (needsReview: ${expectedReview})`,
  );
};

testRec(5, 1, 10, "start", false);
testRec(6, 1, 10, "business", false);
testRec(15, 1, 25, "business", false);
testRec(16, 1, 10, "professional", false);
testRec(40, 2, 50, "professional", false);
testRec(41, 1, 10, "enterprise", true);
testRec(5, 3, 10, "enterprise", true);
testRec(5, 1, "more", "enterprise", true);
testRec(5, 1, 25, "business", false);

// 2. extensionCost assertions
console.log("\n--- 2. extensionCost ---");
const cap = optionalCharges.capacity || [];
const u1Price = cap.find((c) => c.id === "user-1")?.rule?.amount;
const u5Price = cap.find((c) => c.id === "users-5")?.rule?.amount;
const u10Price = cap.find((c) => c.id === "users-10")?.rule?.amount;
const userBundles = [
  { size: 1, price: u1Price },
  { size: 5, price: u5Price },
  { size: 10, price: u10Price },
];

assert(extensionCost(0, userBundles) === 0, "extensionCost(0) === 0");
assert(extensionCost(1, userBundles) === u1Price, `extensionCost(1) === ${u1Price}`);
assert(extensionCost(3, userBundles) === 3 * u1Price, `extensionCost(3) === ${3 * u1Price}`);
assert(extensionCost(5, userBundles) === u5Price, `extensionCost(5) === ${u5Price}`);
assert(extensionCost(10, userBundles) === u10Price, `extensionCost(10) === ${u10Price}`);
assert(extensionCost(15, userBundles) === u10Price + u5Price, `extensionCost(15) === ${u10Price + u5Price}`);
assert(extensionCost(25, userBundles) === 2 * u10Price + u5Price, `extensionCost(25) === ${2 * u10Price + u5Price}`);

// 3. estimate assertions
console.log("\n--- 3. estimate ---");
const businessMonthly = plansById.business.monthly;
const professionalMonthly = plansById.professional.monthly;
const entityPrice = cap.find((c) => c.id === "legal-entity")?.rule?.amount;
const biPrice = optionalCharges.addOns.find((a) => a.id === "advanced-bi")?.rule?.amount;

// Business with 17 users, 1 entity
const est1 = estimate({ users: 17, entities: 1, billing: "monthly" }, "business", catalog);
assert(est1.extraUsers === 2, "est1 extraUsers === 2");
assert(est1.totalMonthly === businessMonthly + extensionCost(2, userBundles), "est1 totalMonthly with extra users");

// With 2 entities
const est2 = estimate({ users: 17, entities: 2, billing: "monthly" }, "business", catalog);
assert(est2.extraEntities === 1, "est2 extraEntities === 1");
assert(
  est2.totalMonthly === businessMonthly + extensionCost(2, userBundles) + entityPrice,
  "est2 totalMonthly includes 1 extra entity",
);

// Advanced BI on business (not included) vs professional (included)
const est3Biz = estimate({ addOns: ["advanced-bi"], billing: "monthly" }, "business", catalog);
const biLineBiz = est3Biz.lines.find((l) => l.id === "advanced-bi");
assert(biLineBiz && biLineBiz.amount === biPrice && !biLineBiz.included, "advanced-bi on business adds its amount");

const est3Pro = estimate({ addOns: ["advanced-bi"], billing: "monthly" }, "professional", catalog);
const biLinePro = est3Pro.lines.find((l) => l.id === "advanced-bi");
assert(biLinePro && biLinePro.amount === 0 && biLinePro.included, "advanced-bi on professional is included (0)");

// Connector custom sets hasQuote
const estConn = estimate({ connectors: ["connector-custom"] }, "business", catalog);
assert(estConn.hasQuote === true, "connector-custom sets hasQuote to true");

// Nelias AI sets hasUsage and isLowerBound
const estAi = estimate({ addOns: ["nelias-ai"] }, "business", catalog);
assert(estAi.hasUsage === true && estAi.isLowerBound === true, "nelias-ai sets hasUsage and isLowerBound");

// Enterprise estimate has plan null
const estEnt = estimate({ users: 50, billing: "monthly" }, "enterprise", catalog);
assert(estEnt.plan === null && estEnt.planAmount === null && estEnt.totalMonthly === null && estEnt.hasQuote === true, "enterprise has null plan and quote flag");

// 4. encodeState / decodeState / sanitizeState assertions
console.log("\n--- 4. encodeState, decodeState & sanitizeState ---");
const testState = {
  industry: "retail-distribution",
  activity: "Distribution de matériel informatique",
  country: "CI",
  companySize: "s2",
  functions: ["finance-accounting", "crm-sales"],
  users: 12,
  entities: 1,
  storage: 25,
  plan: "business",
  addOns: ["advanced-bi"],
  sectorPacks: ["standard-pack"],
  connectors: ["connector-standard"],
  billing: "annual",
};

const encoded = encodeState(testState);
const decoded = decodeState(encoded);
assert(JSON.stringify(testState) === JSON.stringify(decoded), "encodeState/decodeState round-trip parity");

assert(decodeState("%%%") === null, "decodeState('%%%') === null");
assert(decodeState("") === null, "decodeState('') === null");

const validScope = {
  industries: ["retail-distribution", "manufacturing"],
  areas: ["finance-accounting", "crm-sales"],
  countries: ["CI", "SN"],
  addOns: ["advanced-bi"],
  sectorPacks: ["standard-pack"],
  connectors: ["connector-standard"],
};

const rawBad = {
  industry: "unknown-industry",
  activity: "A".repeat(200),
  country: "XX",
  companySize: "s99",
  functions: ["finance-accounting", "bad-function", "finance-accounting"],
  users: 9999,
  entities: 0,
  storage: 999,
  plan: "mega-plan",
  addOns: ["bad-addon"],
  unknownKey: "drop-me",
};

const sanitized = sanitizeState(rawBad, validScope);
assert(sanitized.industry === "", "sanitizeState drops unknown industry");
assert(sanitized.activity.length === 120, "sanitizeState cuts activity to 120 chars");
assert(sanitized.country === "", "sanitizeState drops unknown country");
assert(sanitized.companySize === "", "sanitizeState drops unknown size");
assert(sanitized.functions.length === 1 && sanitized.functions[0] === "finance-accounting", "sanitizeState dedupes and filters functions");
assert(sanitized.users === 500, "sanitizeState clamps users 9999 to 500");
assert(sanitized.entities === 1, "sanitizeState clamps entities 0 to 1");
assert(sanitized.storage === 10, "sanitizeState falls back storage to 10");
assert(sanitized.plan === "", "sanitizeState drops unknown plan");
assert(sanitized.unknownKey === undefined, "sanitizeState drops unknown keys");

if (hasErrors) {
  console.error("\ncheck-configurator FAILED");
  process.exit(1);
} else {
  console.log("\ncheck-configurator OK");
  process.exit(0);
}
