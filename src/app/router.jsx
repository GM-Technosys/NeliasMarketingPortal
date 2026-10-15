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
      { path: "about", ...page(() => import("@/pages/AboutPage")) },
      { path: "about-us", ...page(() => import("@/pages/AboutPage")) },
      { path: "*", element: <Navigate to="/" replace /> },
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
