import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    try {
      const savedTheme = window.localStorage.getItem('theme');
      return savedTheme || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Also update body background immediately
    if (theme === 'light') {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a202c';
    } else {
      document.body.style.backgroundColor = '#101010';
      document.body.style.color = '#f5f5f5';
    }
    
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures and keep rendering.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
