import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme || 'dark');

  const colorTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.theme = theme;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;