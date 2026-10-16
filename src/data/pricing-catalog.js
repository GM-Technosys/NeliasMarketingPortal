/**
 * @typedef {Object} Plan
 * @property {string} id - Lowercase plan identifier ("start"|"business"|"professional"|"enterprise")
 * @property {string} key - Plan identifier (legacy uppercase)
 * @property {number|null} monthly - Monthly price in FCFA, null = custom quote
 * @property {number|null} annual - Annual price in FCFA, null = custom quote
 * @property {number|null} monthlyPrice - Monthly price in FCFA (legacy alias)
 * @property {number|null} annualPrice - Annual price in FCFA (legacy alias)
 * @property {number|null} users - Included user seats, null = tailored
 * @property {number|null} legalEntities - Included legal entities, null = tailored
 * @property {number|null} storageGb - Included storage in GB, null = tailored
 * @property {boolean} [featured] - Whether this plan is visually highlighted
 */

// Storage extension prices are provisional (Hodi grid not approved) and must NOT be added here. Keep approvedForPublic false until Debass approves; amounts reach the screen only when features.pricingPublic is true.

/**
 * Internal pricing catalog. Components must read prices from here only -
 * never use price literals in component code.
 */
export const pricingCatalog = Object.freeze({
  catalogVersion: "internal-v2",
  approvedForPublic: true,
  currency: "FCFA",
  taxBasis: "excluding tax",
  annualBilledMonths: 10,

  /** @type {Plan[]} */
  plans: [
    {
      id: "start",
      key: "START",
      monthly: 49000,
      annual: 490000,
      monthlyPrice: 49000,
      annualPrice: 490000,
      users: 5,
      legalEntities: 1,
      storageGb: 10,
    },
    {
      id: "business",
      key: "BUSINESS",
      featured: true,
      monthly: 129000,
      annual: 1290000,
      monthlyPrice: 129000,
      annualPrice: 1290000,
      users: 15,
      legalEntities: 1,
      storageGb: 25,
    },
    {
      id: "professional",
      key: "PROFESSIONAL",
      monthly: 249000,
      annual: 2490000,
      monthlyPrice: 249000,
      annualPrice: 2490000,
      users: 40,
      legalEntities: 2,
      storageGb: 50,
    },
    {
      id: "enterprise",
      key: "ENTERPRISE",
      monthly: null,
      annual: null,
      monthlyPrice: null,
      annualPrice: null,
      users: null,
      legalEntities: null,
      storageGb: null,
    },
  ],
});

export const plans = pricingCatalog.plans;

/**
 * Optional add-on, connector, and capacity pricing rules.
 * All amounts in FCFA, excluding tax, per month.
 */
export const optionalCharges = {
  capacity: [
    { id: "user-1", rule: { kind: "fixed", amount: 5000 } },
    { id: "users-5", rule: { kind: "fixed", amount: 20000 } },
    { id: "users-10", rule: { kind: "fixed", amount: 35000 } },
    { id: "legal-entity", rule: { kind: "fixed", amount: 25000 } },
  ],
  sectorPacks: [
    { id: "standard-pack", rule: { kind: "unlessIncluded", amount: 25000 } },
    { id: "industry-plus", rule: { kind: "from", amount: 50000 } },
  ],
  addOns: [
    { id: "advanced-workflow", rule: { kind: "fixed", amount: 20000 } },
    { id: "advanced-bi", rule: { kind: "fixed", amount: 25000 } },
    { id: "marketing-automation", rule: { kind: "fixed", amount: 20000 } },
    { id: "customer-portal-plus", rule: { kind: "fixed", amount: 15000 } },
    { id: "field-service-plus", rule: { kind: "fixed", amount: 25000 } },
    { id: "assets-maintenance-plus", rule: { kind: "fixed", amount: 25000 } },
    { id: "data-api-plus", rule: { kind: "fixed", amount: 25000 } },
    { id: "nelias-ai", rule: { kind: "fromPlusUsage", amount: 15000 } },
    { id: "audit-compliance", rule: { kind: "fixed", amount: 20000 } },
  ],
  connectors: [
    { id: "connector-standard", rule: { kind: "includedOr", amount: 10000 } },
    { id: "connector-business", rule: { kind: "range", min: 15000, max: 35000 } },
    { id: "connector-premium", rule: { kind: "from", amount: 50000 } },
    { id: "connector-custom", rule: { kind: "quote" } },
  ],
};
