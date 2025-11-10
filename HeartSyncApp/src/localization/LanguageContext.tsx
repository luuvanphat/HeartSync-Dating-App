import React, {createContext, useContext, ReactNode} from 'react';
import {useStore} from '../store/useStore';
import {translations} from './translations';

interface LanguageContextType {
  t: (key: string) => string;
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const language = useStore((state) => state.settings.language);
  const updateSettings = useStore((state) => state.updateSettings);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const changeLanguage = (lang: string) => {
    updateSettings({language: lang});
  };

  return (
    <LanguageContext.Provider value={{t, language, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};