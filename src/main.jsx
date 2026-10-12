import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/sora";
import "@fontsource-variable/source-sans-3";
import "@/i18n";
import "@/styles/index.css";
import App from "@/app/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
