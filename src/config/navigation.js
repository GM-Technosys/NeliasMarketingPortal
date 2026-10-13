/**
 * Main navigation items shown on the header nav bar.
 * Labels come from i18n keys `nav.*`.
 * @type {Array<{ key: string, to: string }>}
 */
export const mainNav = [
  { key: "whyNelias", to: "#" },
  { key: "howItWorks", to: "#" },
  { key: "industries", to: "#" },
  { key: "features", to: "#" },
  { key: "pricing", to: "#" },
  { key: "resources", to: "#" },
  { key: "about", to: "#" },
];

/**
 * Contact navigation item.
 * @type {{ key: string, to: string }}
 */
export const contactNav = { key: "contact", to: "#" };

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
  { key: "privacy", to: "#" },
  { key: "terms", to: "#" },
];

/**
 * Sign In is an external link - disabled to prevent redirection.
 */
export const signInLink = {
  key: "signIn",
  href: "#",
  external: true,
};
