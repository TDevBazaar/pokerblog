"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { es } from "./es";
import { en } from "./en";
import type { Locale, Translations } from "./types";

type LanguageContextType = {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const STORAGE_KEY = "proker-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return navigator.language.startsWith("es") ? "es" : "en";
}

const FALLBACK = "en";

export const LanguageContext = createContext<LanguageContextType | null>(null);

const MAPS: Record<Locale, Translations> = { es, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t: LanguageContextType["t"] = useCallback(
    (key, params?) => {
      const map = MAPS[locale] ?? MAPS[FALLBACK];
      let value = map[key] ?? MAPS[FALLBACK][key] ?? key;
      if (params && typeof value === "string") {
        for (const [k, v] of Object.entries(params)) {
          value = value.replace(`{${k}}`, String(v));
        }
      }
      return value as string;
    },
    [locale],
  );

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: "en", translations: MAPS.en, setLocale, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, translations: MAPS[locale], setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
