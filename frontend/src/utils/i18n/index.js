// src/utils/i18n/index.js
import React, { createContext, useState, useContext } from 'react';
import en from './en.json';
import si from './si.json';
import ta from './ta.json';

const translations = { en, si, ta };

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const t = (key) => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);