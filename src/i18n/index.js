import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enSeo from "./locales/en/seo.json";
import enHome from "./locales/en/home.json";
import enFeatures from "./locales/en/features.json";
import enIndustries from "./locales/en/industries.json";

import frCommon from "./locales/fr/common.json";
import frSeo from "./locales/fr/seo.json";
import frHome from "./locales/fr/home.json";
import frFeatures from "./locales/fr/features.json";
import frIndustries from "./locales/fr/industries.json";

/**
 * Detect stored language preference. Defaults to "en" unless localStorage
 * explicitly contains "fr" for the "nelias-lang" key.
 * @returns {"en"|"fr"}
 */
function detectLanguage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem("nelias-lang");
      if (stored === "fr") return "fr";
    }
  } catch {
    // localStorage may be unavailable (private browsing, SSR, etc.)
  }
  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: {
        ...enCommon,
        home: enHome,
        features: enFeatures,
        industries: enIndustries,
      },
      seo: enSeo,
      home: enHome,
      features: enFeatures,
      industries: enIndustries,
    },
    fr: {
      common: {
        ...frCommon,
        home: frHome,
        features: frFeatures,
        industries: frIndustries,
      },
      seo: frSeo,
      home: frHome,
      features: frFeatures,
      industries: frIndustries,
    },
  },
  lng: detectLanguage(),
  supportedLngs: ["en", "fr"],
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common", "seo", "home", "features", "industries"],
  interpolation: { escapeValue: false },
});

// Sync <html lang> and persist preference on language change
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem("nelias-lang", lng);
  } catch {
    // Ignore storage errors
  }
});

export default i18n;
