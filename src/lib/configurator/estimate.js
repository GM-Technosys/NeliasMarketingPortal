import { planIncludesAddOns, planIncludesStandardPack } from "./plan-rules.js";

// TODO(Debass): the PDF gives no annual price for options; options are always shown per month and never added to the annual plan price. The extension bundle choice (minimum cost to cover the need) and the lower-bound convention are assumptions.

/**
 * Computes the minimum total price to cover at least n extra items
 * using unlimited available bundles.
 *
 * @param {number} n - Required capacity count
 * @param {Array<{ size: number, price: number }>} bundles
 * @returns {number}
 */
export function extensionCost(n, bundles = []) {
  if (n <= 0 || !Array.isArray(bundles) || bundles.length === 0) {
    return 0;
  }

  const validBundles = bundles.filter((b) => b && b.size > 0 && typeof b.price === "number");
  if (validBundles.length === 0) return 0;

  const maxSize = Math.max(...validBundles.map((b) => b.size));
  const limit = n + maxSize;

  const dp = new Array(limit + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i <= limit; i++) {
    if (dp[i] === Infinity) continue;
    for (const b of validBundles) {
      const nextIdx = i + b.size;
      if (nextIdx <= limit) {
        if (dp[i] + b.price < dp[nextIdx]) {
          dp[nextIdx] = dp[i] + b.price;
        }
      }
    }
  }

  let minCost = Infinity;
  for (let i = n; i <= limit; i++) {
    if (dp[i] < minCost) {
      minCost = dp[i];
    }
  }

  return minCost === Infinity ? 0 : minCost;
}

/**
 * Calculates line-by-line configuration estimate.
 *
 * @param {Object} state - Configurator state
 * @param {string} planId - Current selected/effective plan id
 * @param {Object} catalog - Pricing catalog with plansById and optionalCharges
 * @returns {Object}
 */
export function estimate(state, planId, catalog) {
  const billing = state?.billing === "annual" ? "annual" : "monthly";
  const plansById = catalog?.plansById || {};
  const optionalCharges = catalog?.optionalCharges || {};

  const isEnterprise = planId === "enterprise";
  const planData = isEnterprise ? null : plansById[planId] || null;

  let hasQuote = isEnterprise;
  let hasUsage = false;
  let isLowerBound = false;

  const lines = [];

  // 1. Extra users
  const reqUsers = Number(state?.users) || 1;
  const includedUsers = planData?.users ?? (isEnterprise ? reqUsers : 0);
  const extraUsers = Math.max(0, reqUsers - includedUsers);

  if (extraUsers > 0 && !isEnterprise) {
    const capList = optionalCharges.capacity || [];
    const u1 = capList.find((c) => c.id === "user-1")?.rule?.amount ?? 5000;
    const u5 = capList.find((c) => c.id === "users-5")?.rule?.amount ?? 20000;
    const u10 = capList.find((c) => c.id === "users-10")?.rule?.amount ?? 35000;

    const bundles = [
      { size: 1, price: u1 },
      { size: 5, price: u5 },
      { size: 10, price: u10 },
    ];
    const amount = extensionCost(extraUsers, bundles);
    lines.push({
      id: "extra-users",
      group: "users",
      count: extraUsers,
      amount,
      included: false,
    });
  }

  // 2. Extra legal entities
  const reqEntities = Number(state?.entities) || 1;
  const includedEntities = planData?.legalEntities ?? (isEnterprise ? reqEntities : 0);
  const extraEntities = Math.max(0, reqEntities - includedEntities);

  if (extraEntities > 0 && !isEnterprise) {
    const capList = optionalCharges.capacity || [];
    const entPrice = capList.find((c) => c.id === "legal-entity")?.rule?.amount ?? 25000;
    const amount = extraEntities * entPrice;
    lines.push({
      id: "extra-entities",
      group: "entities",
      count: extraEntities,
      amount,
      included: false,
    });
  }

  // 3. Sector packs
  const selectedPacks = Array.isArray(state?.sectorPacks) ? state.sectorPacks : [];
  const packCatalog = optionalCharges.sectorPacks || [];

  for (const packId of selectedPacks) {
    const item = packCatalog.find((p) => p.id === packId);
    if (packId === "standard-pack") {
      const isIncluded = planIncludesStandardPack[planId] ?? false;
      if (isIncluded) {
        lines.push({
          id: packId,
          group: "pack",
          amount: 0,
          included: true,
        });
      } else {
        const amount = item?.rule?.amount ?? 0;
        lines.push({
          id: packId,
          group: "pack",
          rule: item?.rule,
          amount,
          included: false,
        });
      }
    } else if (packId === "industry-plus") {
      isLowerBound = true;
      const amount = item?.rule?.amount ?? 0;
      lines.push({
        id: packId,
        group: "pack",
        rule: item?.rule,
        amount,
        included: false,
      });
    }
  }

  // 4. Add-ons
  const selectedAddOns = Array.isArray(state?.addOns) ? state.addOns : [];
  const addOnCatalog = optionalCharges.addOns || [];
  const includedAddOns = planIncludesAddOns[planId] || [];

  for (const addOnId of selectedAddOns) {
    const isIncluded = includedAddOns.includes(addOnId);
    if (isIncluded) {
      lines.push({
        id: addOnId,
        group: "addon",
        amount: 0,
        included: true,
      });
    } else {
      const item = addOnCatalog.find((a) => a.id === addOnId);
      const rule = item?.rule;
      const amount = rule?.amount ?? 0;
      if (rule?.kind === "fromPlusUsage") {
        hasUsage = true;
        isLowerBound = true;
      } else if (rule?.kind === "from") {
        isLowerBound = true;
      }
      lines.push({
        id: addOnId,
        group: "addon",
        rule,
        amount,
        included: false,
      });
    }
  }

  // 5. Connectors
  const selectedConnectors = Array.isArray(state?.connectors) ? state.connectors : [];
  const connectorCatalog = optionalCharges.connectors || [];

  for (const connectorId of selectedConnectors) {
    const item = connectorCatalog.find((c) => c.id === connectorId);
    const rule = item?.rule;
    let amount = 0;
    if (rule?.kind === "fixed") {
      amount = rule.amount ?? 0;
    } else if (rule?.kind === "from") {
      amount = rule.amount ?? 0;
      isLowerBound = true;
    } else if (rule?.kind === "range") {
      amount = rule.min ?? 0;
      isLowerBound = true;
    } else if (rule?.kind === "includedOr") {
      amount = 0;
      isLowerBound = true;
    } else if (rule?.kind === "quote") {
      amount = 0;
      hasQuote = true;
    }
    lines.push({
      id: connectorId,
      group: "connector",
      rule,
      amount,
      included: false,
    });
  }

  // Options total monthly
  const monthlyOptions = lines.reduce((sum, line) => sum + (line.amount || 0), 0);

  // Plan amounts
  let plan = null;
  let planAmount = null;
  let totalMonthly = null;

  if (planData && !isEnterprise) {
    plan = { monthly: planData.monthly, annual: planData.annual };
    planAmount = billing === "annual" ? planData.annual : planData.monthly;
    if (billing === "monthly") {
      totalMonthly = (planData.monthly ?? 0) + monthlyOptions;
    }
  }

  return {
    billing,
    planId,
    plan,
    lines,
    monthlyOptions,
    planAmount,
    totalMonthly,
    isLowerBound,
    hasUsage,
    hasQuote,
    extraUsers,
    extraEntities,
  };
}
