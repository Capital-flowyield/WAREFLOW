import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CONTENT } from './data/content';

const LangCtx = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('wf-lang') || 'it';
    } catch {
      return 'it';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wf-lang', lang);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
