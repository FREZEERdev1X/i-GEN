
import React, { useState, useEffect, useMemo } from 'react';
import { Theme, Language } from './types';
import { translations } from './constants/localization';
import { LocalizationContext } from './hooks/useLocalization';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Snowfall from './components/Snowfall';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [language, setLanguage] = useState<Language>(Language.EN);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === Theme.LIGHT ? 'dark' : 'light');
    root.classList.add(theme);
    root.lang = language;
    root.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [theme, language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === Language.EN ? Language.AR : Language.EN);
  };

  const t = useMemo(() => {
    return (key: string) => {
      const langTranslations = translations[language];
      if (langTranslations && key in langTranslations) {
        return langTranslations[key as keyof typeof langTranslations];
      }
      return key;
    };
  }, [language]);


  return (
    <LocalizationContext.Provider value={{ language, setLanguage: toggleLanguage, t }}>
      <div className="relative min-h-screen w-full overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-500 font-sans">
        <Snowfall />
        <div className="relative z-10 flex flex-col items-center w-full min-h-screen p-4">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center py-8">
            <ImageGenerator />
          </main>
        </div>
      </div>
    </LocalizationContext.Provider>
  );
};

export default App;
