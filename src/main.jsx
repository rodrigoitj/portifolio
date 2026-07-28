import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { content } from "./data.js";

const AVAILABLE_LANGS = Object.keys(content);
const DEFAULT_LANG = "en";

function detectLang() {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const browserLangs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const raw of browserLangs || []) {
    const normalized = raw.toLowerCase();
    const exact = AVAILABLE_LANGS.find((l) => l === normalized);
    if (exact) return exact;
    const base = normalized.split("-")[0];
    const partial = AVAILABLE_LANGS.find((l) => l.split("-")[0] === base);
    if (partial) return partial;
  }
  return DEFAULT_LANG;
}

function Root() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("rc-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rc-theme", theme);
  }, [theme]);

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const saved = localStorage.getItem("rc-lang");
    if (saved && AVAILABLE_LANGS.includes(saved)) return saved;
    return detectLang();
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("rc-lang", lang);
  }, [lang]);

  return <App theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);