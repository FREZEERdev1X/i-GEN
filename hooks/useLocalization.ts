
import { createContext, useContext } from 'react';
import { Language } from '../types';

interface LocalizationContextType {
  language: Language;
  setLanguage: () => void;
  t: (key: string) => string;
}

export const LocalizationContext = createContext<LocalizationContextType>({
  language: Language.EN,
  setLanguage: () => console.warn('no language provider'),
  t: (key: string) => key,
});

export const useLocalization = () => useContext(LocalizationContext);
