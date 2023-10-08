import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsEnglish } from "./translations/en";
import { translationsGerman } from "./translations/de";

const resources = {
  en: {
    translation: translationsEnglish,
  },
  de: {
    translation: translationsGerman,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
