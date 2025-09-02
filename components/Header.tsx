
import React from 'react';
import { Theme } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import LanguageIcon from './icons/LanguageIcon';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { t, setLanguage } = useLocalization();

  return (
    <header className="w-full max-w-6xl mx-auto flex justify-between items-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
        {t('title')}
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
        </button>
        <button
          onClick={setLanguage}
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle language"
        >
          <LanguageIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
