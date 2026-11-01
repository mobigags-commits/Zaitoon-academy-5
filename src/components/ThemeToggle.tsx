import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export type SiteTheme = 'dark' | 'light' | 'crimson';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'full';
}

const THEME_STORAGE_KEY = 'zra_site_theme';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'compact' }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as SiteTheme;
      if (saved && (saved === 'dark' || saved === 'light' || saved === 'crimson')) {
        return saved;
      }
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('theme-dark', 'theme-light', 'theme-crimson', 'dark');

      if (theme === 'light') {
        root.classList.add('theme-light');
      } else if (theme === 'crimson') {
        root.classList.add('theme-crimson', 'dark');
      } else {
        root.classList.add('theme-dark', 'dark');
      }

      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('crimson');
    else setTheme('dark');
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light Ivory';
    if (theme === 'crimson') return 'Imperial Crimson';
    return 'Obsidian Dark';
  };

  return (
    <button
      onClick={cycleTheme}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
        theme === 'light'
          ? 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200'
          : theme === 'crimson'
          ? 'bg-red-950/80 text-amber-300 border-red-700/60 hover:bg-red-900'
          : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-700'
      } ${className}`}
      title={`Current Theme: ${getThemeLabel()} (Click to toggle)`}
      aria-label="Toggle Theme Mode"
    >
      {theme === 'light' ? (
        <Sun className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
      ) : theme === 'crimson' ? (
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-blue-400" />
      )}
      {variant === 'full' && <span>{getThemeLabel()}</span>}
    </button>
  );
};
