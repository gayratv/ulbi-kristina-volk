import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, ThemeContext, ThemeEnum } from './ThemeContext';

interface UseThemeHook {
	theme: ThemeEnum;
	toggleTheme: () => void;
}

export function useTheme(): UseThemeHook {
  const {
    theme,
    setTheme,
  } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: ThemeEnum;
    switch (theme) {
      case ThemeEnum.DARK:
        newTheme = ThemeEnum.LIGHT;
        break;
      case ThemeEnum.LIGHT:
        newTheme = ThemeEnum.BLUE;
        break;
      case ThemeEnum.BLUE:
        newTheme = ThemeEnum.DARK;
        break;
      default:
        newTheme = ThemeEnum.LIGHT;
    }
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || ThemeEnum.LIGHT,
    toggleTheme,
  };
}
