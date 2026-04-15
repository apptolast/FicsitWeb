import { createContext, useContext } from 'react';

export type Lang = 'es' | 'en';

export type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

export const LangContext = createContext<LangContextValue>({
  lang: 'es',
  setLang: () => {},
});

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
