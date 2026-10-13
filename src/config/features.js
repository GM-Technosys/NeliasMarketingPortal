/** Feature flags - each is true only when the env value is the string "true", except frenchEnabled which is enabled unless explicitly "false". */
export const features = Object.freeze({
  configurator: import.meta.env.VITE_FEATURE_CONFIGURATOR === "true",
  checkout: import.meta.env.VITE_FEATURE_CHECKOUT === "true",
  pricingPublic: import.meta.env.VITE_FEATURE_PRICING_PUBLIC === "true",
  frenchEnabled: import.meta.env.VITE_FEATURE_FRENCH !== "false",
});
