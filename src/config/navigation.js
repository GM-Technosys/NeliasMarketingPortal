import { site } from "./site.js";

/**
 * Main navigation items shown on the header nav bar.
 * Labels come from i18n keys `nav.*`.
 * @type {Array<{ key: string, to: string }>}
 */
export const mainNav = [
  { key: "whyNelias", to: "/why-nelias" },
  { key: "howItWorks", to: "/how-it-works" },
  { key: "industries", to: "/industries" },
  { key: "features", to: "/features" },
  { key: "pricing", to: "/pricing" },
  { key: "resources", to: "/resources" },
  { key: "about", to: "/about" },
];

/**
 * Contact navigation item.
 * @type {{ key: string, to: string }}
 */
export const contactNav = { key: "contact", to: "/contact" };

/**
 * Primary navigation items (mainNav + contact).
 * @type {Array<{ key: string, to: string }>}
 */
export const primaryNav = [...mainNav, contactNav];

/**
 * Footer navigation items (Home + primaryNav).
 * @type {Array<{ key: string, to: string }>}
 */
export const footerNav = [{ key: "home", to: "/" }, ...primaryNav];

/**
 * Footer legal links.
 * @type {Array<{ key: string, to: string }>}
 */
export const legalNav = [
  { key: "privacy", to: "/privacy" },
  { key: "terms", to: "/terms" },
];

/**
 * Sign In is an external link — uses loginUrl from site config.
 */
export const signInLink = {
  key: "signIn",
  href: site.loginUrl,
  external: true,
};
