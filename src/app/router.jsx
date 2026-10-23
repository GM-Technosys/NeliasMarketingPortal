import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";

/**
 * Lazy-load helper: wraps a dynamic import so createBrowserRouter
 * can use route-level code splitting.
 * @param {() => Promise<{default: import("react").ComponentType}>} load
 */
const page = (load) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

/** @type {import("react-router-dom").RouteObject[]} */
const routes = [
  {
    element: <RootLayout />,
    children: [
      { index: true, ...page(() => import("@/pages/HomePage")) },
      { path: "why-nelias", ...page(() => import("@/pages/WhyNeliasPage")) },
      { path: "how-it-works", ...page(() => import("@/pages/HowItWorksPage")) },
      { path: "industries", ...page(() => import("@/pages/IndustriesPage")) },
      { path: "industries/:slug", ...page(() => import("@/pages/IndustryDetailPage")) },
      { path: "features", ...page(() => import("@/pages/FeaturesPage")) },
      { path: "pricing", ...page(() => import("@/pages/PricingPage")) },
      { path: "about", ...page(() => import("@/pages/AboutPage")) },
      { path: "about-us", ...page(() => import("@/pages/AboutPage")) },
      { path: "contact", ...page(() => import("@/pages/ContactPage")) },
      { path: "demo", ...page(() => import("@/pages/DemoPage")) },
      { path: "terms", ...page(() => import("@/pages/TermsPage")) },
      { path: "terms-of-sale", ...page(() => import("@/pages/TermsOfSalePage")) },
      { path: "cgv", ...page(() => import("@/pages/TermsOfSalePage")) },
      { path: "dpa", ...page(() => import("@/pages/DpaPage")) },
      { path: "privacy", ...page(() => import("@/pages/PrivacyPage")) },
      { path: "sla", ...page(() => import("@/pages/SlaPage")) },
      { path: "resources", ...page(() => import("@/pages/ResourcesPage")) },
      { path: "configure", ...page(() => import("@/pages/ConfigurePage")) },
      { path: "*", ...page(() => import("@/pages/NotFoundPage")) },
    ],
  },
];

// DEV-only preview routes - not reachable in production builds
if (import.meta.env.DEV) {
  routes[0].children.unshift(
    {
      path: "__design",
      ...page(() => import("@/pages/DesignPreviewPage")),
    },
    {
      path: "__ui",
      ...page(() => import("@/pages/UiKitPreviewPage")),
    },
  );
}

export const router = createBrowserRouter(routes);
