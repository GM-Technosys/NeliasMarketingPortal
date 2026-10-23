/**
 * Analytics event constants.
 * The analytics provider is a later decision - for now, track() is a no-op
 * that logs to console.debug in development only.
 */
export const EVENTS = Object.freeze({
  CTA_CLICK: "cta_click",
  NAV_CLICK: "nav_click",
  CONFIGURATOR_START: "configurator_start",
  CONFIGURATOR_STEP: "configurator_step",
  DEMO_REQUEST_SUBMIT: "demo_request_submit",
  CONTACT_SUBMIT: "contact_submit",
  PRICING_VIEW: "pricing_view",
  PLAN_SELECT: "plan_select",
  LANGUAGE_CHANGE: "language_change",
  THEME_CHANGE: "theme_change",
  FILTER_CHANGE: "filter_change",
  BILLING_CHANGE: "billing_change",
  SEARCH: "search",
  CONFIGURATOR_SAVE: "configurator_save",
  CONFIGURATOR_SHARE: "configurator_share",
  MODULES_CHANGE: "modules_change",
});

/**
 * Track an analytics event. Currently a no-op; logs in DEV only.
 * @param {string} event - One of EVENTS values
 * @param {Record<string, unknown>} [props] - Additional event properties
 */
export function track(event, props) {
  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, props);
  }
}
