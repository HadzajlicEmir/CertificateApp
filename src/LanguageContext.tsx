import { createContext } from "react";

export interface LanguageContextValue {
  currentLanguage: string;
  setCurrentLanguage: (value: string) => void;
}

const defaultValue: LanguageContextValue = {
  currentLanguage: "en",
  setCurrentLanguage: () => {},
};

export const LanguageContext = createContext(defaultValue);
