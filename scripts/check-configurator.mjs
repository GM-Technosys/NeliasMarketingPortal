import { plans, optionalCharges, additionalModuleRule } from "../src/data/pricing-catalog.js";
import { industryPacks, industryPackRule } from "../src/data/industry-packs.js";
import { industries } from "../src/data/industries.js";
import { industryAreas } from "../src/data/industry-areas.js";
import { featureAreaOrder } from "../src/data/feature-order.js";
import { toPlansById } from "../src/lib/configurator/plan-rules.js";
import { recommendPlan } from "../src/lib/configurator/recommend.js";
import { extensionCost, estimate } from "../src/lib/configurator/estimate.js";
import { defaultState, sanitizeState, encodeState, decodeState } from "../src/lib/configurator/model.js";
import {
  moduleInfo,
  recommendModules,
  labelModules,
  visibleModuleIds,
  quotaOf,
} from "../src/lib/configurator/modules.js";

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

// 3. moduleInfo assertions
console.log("\n--- 3. moduleInfo ---");
// START with 4 -> extra 0; START with 5 -> extra 1
const miStart4 = moduleInfo(["m1", "m2", "m3", "m4"], "start", plansById);
assert(miStart4.selected === 4 && miStart4.included === 4 && miStart4.extra === 0 && miStart4.remaining === 0 && !miStart4.unlimited, "moduleInfo: START with 4 -> extra 0");
const miStart5 = moduleInfo(["m1", "m2", "m3", "m4", "m5"], "start", plansById);
assert(miStart5.selected === 5 && miStart5.included === 4 && miStart5.extra === 1 && miStart5.remaining === 0, "moduleInfo: START with 5 -> extra 1");

// BUSINESS 6 -> 0 and 7 -> 1
const miBiz6 = moduleInfo(new Array(6).fill("m"), "business", plansById);
const miBiz7 = moduleInfo(new Array(7).fill("m"), "business", plansById);
assert(miBiz6.extra === 0 && miBiz7.extra === 1, "moduleInfo: BUSINESS 6 -> 0 and 7 -> 1");

// PROFESSIONAL 8 -> 0 and 12 -> 4
const miPro8 = moduleInfo(new Array(8).fill("m"), "professional", plansById);
const miPro12 = moduleInfo(new Array(12).fill("m"), "professional", plansById);
assert(miPro8.extra === 0 && miPro12.extra === 4, "moduleInfo: PROFESSIONAL 8 -> 0 and 12 -> 4");

// Enterprise -> unlimited
const miEnt = moduleInfo(new Array(10).fill("m"), "enterprise", plansById);
assert(miEnt.unlimited === true && miEnt.extra === 0 && miEnt.included === null, "moduleInfo: enterprise -> unlimited");

// 4. recommendModules assertions
console.log("\n--- 4. recommendModules ---");
const visibleIdsIt = visibleModuleIds("it-technology-services");
const recStart = recommendModules("it-technology-services", 4, industryAreas, visibleIdsIt);
const recBiz = recommendModules("it-technology-services", 6, industryAreas, visibleIdsIt);
assert(recStart.length === 4, "recommendModules: START cuts a 5-area sector to 4");
assert(recBiz.length === 5, "recommendModules: BUSINESS keeps all 5");
assert(recommendModules("other", 4, industryAreas, visibleIdsIt).length === 0, "recommendModules: 'other' gives []");
assert(recommendModules("", 4, industryAreas, visibleIdsIt).length === 0, "recommendModules: empty gives []");

// 5. labelModules assertions
console.log("\n--- 5. labelModules ---");
const labeled5 = labelModules(["m1", "m2", "m3", "m4", "m5"], 4);
assert(labeled5.slice(0, 4).every((l) => l.kind === "included"), "labelModules: first 4 are 'included'");
assert(labeled5[4].kind === "additional", "labelModules: 5th is 'additional'");
const labeledEnt = labelModules(["m1", "m2", "m3"], null);
assert(labeledEnt.every((l) => l.kind === "included"), "labelModules: enterprise gives all 'included'");

// 6. estimate assertions
console.log("\n--- 6. estimate ---");
const startMonthly = plansById.start.monthly;
const businessMonthly = plansById.business.monthly;
const professionalMonthly = plansById.professional.monthly;
const entityPrice = cap.find((c) => c.id === "legal-entity")?.rule?.amount;
const biPrice = optionalCharges.addOns.find((a) => a.id === "advanced-bi")?.rule?.amount;
const addModulePrice = optionalCharges.modules?.find((m) => m.id === "additional-module")?.rule?.amount;

// START + 4 modules = start monthly
const estStart4 = estimate({ modules: featureAreaOrder.slice(0, 4), billing: "monthly" }, "start", catalog);
assert(estStart4.extraModules === 0 && estStart4.totalMonthly === startMonthly, "estimate: START + 4 modules = start monthly");
assert(!estStart4.lines.some((l) => l.group === "modules"), "estimate: START + 4 modules has no module line");

// START + 5 modules = start monthly + additional-module amount (client example: assert it equals 64000 with current catalog)
const estStart5 = estimate({ modules: featureAreaOrder.slice(0, 5), billing: "monthly" }, "start", catalog);
assert(estStart5.extraModules === 1, "estStart5 extraModules === 1");
assert(estStart5.totalMonthly === startMonthly + addModulePrice, "estimate: START + 5 modules = start monthly + addModulePrice");
assert(estStart5.totalMonthly === 64000, "client example: START + 5 modules equals 64000 FCFA with current catalog");
const modLine5 = estStart5.lines.find((l) => l.id === "additional-module");
assert(modLine5 && modLine5.amount === addModulePrice && modLine5.count === 1, "estimate: modLine5 has amount 15000 and count 1");

// START with all 12 modules = start monthly + 8 * additional-module amount
const estStart12 = estimate({ modules: featureAreaOrder.slice(0, 12), billing: "monthly" }, "start", catalog);
assert(
  estStart12.extraModules === 8 && estStart12.totalMonthly === startMonthly + 8 * addModulePrice,
  "estimate: START with all 12 modules = start monthly + 8 * additional-module",
);

// BUSINESS 6 -> no module line, 7 -> one
const estBiz6 = estimate({ modules: featureAreaOrder.slice(0, 6), billing: "monthly" }, "business", catalog);
const estBiz7 = estimate({ modules: featureAreaOrder.slice(0, 7), billing: "monthly" }, "business", catalog);
assert(estBiz6.extraModules === 0 && !estBiz6.lines.some((l) => l.group === "modules"), "estimate: BUSINESS 6 -> no module line");
assert(estBiz7.extraModules === 1 && estBiz7.lines.filter((l) => l.group === "modules").length === 1, "estimate: BUSINESS 7 -> one module line");

// PROFESSIONAL 8 -> none, 9 -> one
const estPro8 = estimate({ modules: featureAreaOrder.slice(0, 8), billing: "monthly" }, "professional", catalog);
const estPro9 = estimate({ modules: featureAreaOrder.slice(0, 9), billing: "monthly" }, "professional", catalog);
assert(estPro8.extraModules === 0 && !estPro8.lines.some((l) => l.group === "modules"), "estimate: PROFESSIONAL 8 -> none");
assert(estPro9.extraModules === 1 && estPro9.lines.filter((l) => l.group === "modules").length === 1, "estimate: PROFESSIONAL 9 -> one");

// Replacing one module with another at the same count leaves the price unchanged
const estSwapA = estimate({ modules: [featureAreaOrder[0], featureAreaOrder[1], featureAreaOrder[2], featureAreaOrder[3], featureAreaOrder[4]], billing: "monthly" }, "start", catalog);
const estSwapB = estimate({ modules: [featureAreaOrder[0], featureAreaOrder[1], featureAreaOrder[2], featureAreaOrder[3], featureAreaOrder[5]], billing: "monthly" }, "start", catalog);
assert(estSwapA.totalMonthly === estSwapB.totalMonthly, "estimate: replacing one module with another at same count leaves price unchanged");

// START + 5 modules + 7 users adds module amount AND cheapest user extension for 2 extra users
const estStart5Mod7Users = estimate({ modules: featureAreaOrder.slice(0, 5), users: 7, billing: "monthly" }, "start", catalog);
assert(estStart5Mod7Users.extraUsers === 2 && estStart5Mod7Users.extraModules === 1, "estimate: extraUsers 2 and extraModules 1");
assert(
  estStart5Mod7Users.totalMonthly === startMonthly + addModulePrice + extensionCost(2, userBundles),
  "estimate: START + 5 modules + 7 users adds module amount AND user extension",
);

// Enterprise has no module line
const estEntModules = estimate({ modules: featureAreaOrder.slice(0, 10), users: 50, billing: "monthly" }, "enterprise", catalog);
assert(estEntModules.extraModules === 0 && !estEntModules.lines.some((l) => l.group === "modules"), "estimate: enterprise has no module line");

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

// 7. encodeState / decodeState / sanitizeState assertions
console.log("\n--- 7. encodeState, decodeState & sanitizeState ---");
const testState = {
  industry: "retail-distribution",
  activity: "Distribution de matériel informatique",
  country: "CI",
  companySize: "s2",
  modules: ["finance-accounting", "crm-sales"],
  modulesTouched: true,
  users: 12,
  entities: 1,
  storage: 25,
  plan: "business",
  addOns: ["advanced-bi"],
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
  modules: ["finance-accounting", "crm-sales"],
  areas: ["finance-accounting", "crm-sales"],
  countries: ["CI", "SN"],
  addOns: ["advanced-bi"],
  connectors: ["connector-standard"],
};

const rawBad = {
  industry: "unknown-industry",
  activity: "A".repeat(200),
  country: "XX",
  companySize: "s99",
  modules: ["finance-accounting", "bad-function", "finance-accounting"],
  modulesTouched: true,
  users: 9999,
  entities: 0,
  storage: 999,
  plan: "mega-plan",
  addOns: ["bad-addon"],
  sectorPacks: ["legacy-pack"],
  unknownKey: "drop-me",
};

const sanitized = sanitizeState(rawBad, validScope);
assert(sanitized.industry === "", "sanitizeState drops unknown industry");
assert(sanitized.activity.length === 120, "sanitizeState cuts activity to 120 chars");
assert(sanitized.country === "", "sanitizeState drops unknown country");
assert(sanitized.companySize === "", "sanitizeState drops unknown size");
assert(sanitized.modules.length === 1 && sanitized.modules[0] === "finance-accounting", "sanitizeState dedupes and filters modules");
assert(sanitized.sectorPacks === undefined, "sanitizeState drops legacy sectorPacks");
assert(sanitized.users === 500, "sanitizeState clamps users 9999 to 500");
assert(sanitized.entities === 1, "sanitizeState clamps entities 0 to 1");
assert(sanitized.storage === 10, "sanitizeState falls back storage to 10");
assert(sanitized.plan === "", "sanitizeState drops unknown plan");
assert(sanitized.unknownKey === undefined, "sanitizeState drops unknown keys");

// Legacy functions become modules with modulesTouched: true
const legFunctions = sanitizeState({ functions: ["finance-accounting", "crm-sales"] }, validScope);
assert(
  legFunctions.modulesTouched === true &&
    legFunctions.modules.length === 2 &&
    legFunctions.modules[0] === "finance-accounting",
  "sanitizeState: legacy functions become modules with modulesTouched true",
);

// modulesTouched: false ignores stored modules
const legUntouched = sanitizeState({ modules: ["finance-accounting"], modulesTouched: false }, validScope);
assert(
  legUntouched.modulesTouched === false && legUntouched.modules.length === 0,
  "sanitizeState: modulesTouched: false ignores stored modules",
);

// 8. Catalog & Industry+ assertions
console.log("\n--- 8. Catalog & Industry+ assertions ---");
const includedModules = [
  plansById.start.includedModules,
  plansById.business.includedModules,
  plansById.professional.includedModules,
  plansById.enterprise.includedModules,
];
assert(
  JSON.stringify(includedModules) === JSON.stringify([4, 6, 8, null]),
  "includedModules equals [4, 6, 8, null] for start, business, professional, enterprise",
);
assert(
  additionalModuleRule?.kind === "fixed" && additionalModuleRule?.amount === 15000,
  "additional-module rule is fixed 15000",
);
const addModuleItem = optionalCharges.modules?.find((m) => m.id === "additional-module");
assert(
  addModuleItem?.rule?.kind === "fixed" && addModuleItem?.rule?.amount === 15000,
  "optionalCharges.modules contains additional-module fixed 15000",
);
assert(
  optionalCharges.sectorPacks === undefined,
  "optionalCharges has no sectorPacks",
);

function scanForStoragePrice(obj) {
  if (!obj || typeof obj !== "object") return false;
  for (const [k, v] of Object.entries(obj)) {
    if (k.toLowerCase().includes("storage") && v && typeof v === "object" && (typeof v.amount === "number" || v.rule)) return true;
    if (v && typeof v === "object") {
      if (typeof v.id === "string" && v.id.toLowerCase().includes("storage") && (v.rule || typeof v.amount === "number" || typeof v.price === "number")) {
        return true;
      }
      if (scanForStoragePrice(v)) return true;
    }
  }
  return false;
}
assert(!scanForStoragePrice(catalog), "no key anywhere in the catalog contains storage with a price");

assert(Array.isArray(industryPacks) && industryPacks.length === 5, "industryPacks has exactly 5 entries");
assert(industryPacks.every((p) => p.status === "planned"), "all industryPacks status: 'planned'");
assert(
  industryPacks.every((p) => p.industries.every((ind) => industries.includes(ind))),
  "every industries slug in industryPacks exists in industries.js",
);
assert(industryPackRule?.amount === 50000, "industryPackRule.amount is 50000");

if (hasErrors) {
  console.error("\ncheck-configurator FAILED");
  process.exit(1);
} else {
  console.log("\ncheck-configurator OK");
  process.exit(0);
}
