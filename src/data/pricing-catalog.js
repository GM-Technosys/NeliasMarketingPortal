/**
 * @typedef {Object} Plan
 * @property {string} key - Plan identifier
 * @property {number|null} monthlyPrice - Monthly price in FCFA, null = custom quote
 * @property {number|null} annualPrice - Annual price in FCFA, null = custom quote
 * @property {number|null} users - Included user seats, null = tailored
 * @property {number|null} legalEntities - Included legal entities, null = tailored
 * @property {number|null} storageGb - Included storage in GB, null = tailored
 * @property {boolean} [featured] - Whether this plan is visually highlighted
 */

/**
 * Internal pricing catalog. Components must read prices from here only —
 * never use price literals in component code.
 *
 * NOTE: Do NOT add storage extension prices (they are provisional and must not
 * be published). Add-ons and connectors are added in the Pricing and
 * Configurator steps.
 */
export const pricingCatalog = Object.freeze({
  catalogVersion: "internal-v2",
  approvedForPublic: false,
  currency: "FCFA",
  taxBasis: "excluding tax",
  annualBilledMonths: 10,

  /** @type {Plan[]} */
  plans: [
    {
      key: "START",
      monthlyPrice: 49000,
      annualPrice: 490000,
      users: 5,
      legalEntities: 1,
      storageGb: 10,
    },
    {
      key: "BUSINESS",
      featured: true,
      monthlyPrice: 129000,
      annualPrice: 1290000,
      users: 15,
      legalEntities: 1,
      storageGb: 25,
    },
    {
      key: "PROFESSIONAL",
      monthlyPrice: 249000,
      annualPrice: 2490000,
      users: 40,
      legalEntities: 2,
      storageGb: 50,
    },
    {
      key: "ENTERPRISE",
      monthlyPrice: null,
      annualPrice: null,
      users: null,
      legalEntities: null,
      storageGb: null,
    },
  ],
});
