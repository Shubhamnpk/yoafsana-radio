import { useState, useEffect } from 'react';

export type Theme =
  | 'system'
  | 'theme-dark-brown'  // Default
  | 'theme-dark-blue'
  | 'theme-dark-purple'
  | 'theme-dark-green'
  | 'theme-dark-red'
  | 'theme-dark-orange'
  | 'theme-light-brown'
  | 'theme-light-blue'
  | 'theme-light-purple'
  | 'theme-light-green'
  | 'theme-light-red'
  | 'theme-light-orange'
  ;

export const themes: { value: Theme; label: string; isDark: boolean }[] = [
  { value: 'system', label: 'System', isDark: false },
  { value: 'theme-dark-brown', label: 'Dark Brown', isDark: true },
  { value: 'theme-dark-blue', label: 'Dark Blue', isDark: true },
  { value: 'theme-dark-purple', label: 'Dark Purple', isDark: true },
  { value: 'theme-dark-green', label: 'Dark Green', isDark: true },
  { value: 'theme-dark-red', label: 'Dark Red', isDark: true },
  { value: 'theme-dark-orange', label: 'Dark Orange', isDark: true },
  { value: 'theme-light-brown', label: 'Light Brown', isDark: false },
  { value: 'theme-light-blue', label: 'Light Blue', isDark: false },
  { value: 'theme-light-purple', label: 'Light Purple', isDark: false },
  { value: 'theme-light-green', label: 'Light Green', isDark: false },
  { value: 'theme-light-red', label: 'Light Red', isDark: false },
  { value: 'theme-light-orange', label: 'Light Orange', isDark: false },
];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    const initialTheme = saved || 'theme-dark-brown';

    // Apply theme immediately to prevent flash
    const root = window.document.documentElement;

    // Remove all theme classes
    themes.forEach(t => {
      if (t.value !== 'system') {
        root.classList.remove(t.value);
      }
    });

    if (initialTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'theme-dark-brown'
        : 'theme-light-brown';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(initialTheme);
    }

    return initialTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      // Remove all theme classes
      themes.forEach(t => {
        if (t.value !== 'system') {
          root.classList.remove(t.value);
        }
      });

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'theme-dark-brown'
          : 'theme-light-brown';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Listen for system theme changes if using system theme
    let mediaQuery: MediaQueryList | null = null;
    if (theme === 'system') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', applyTheme);
    }

    localStorage.setItem('theme', theme);

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', applyTheme);
      }
    };
  }, [theme]);

  return { theme, setTheme, themes };
}