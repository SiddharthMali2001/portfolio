import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-16 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-100 dark:bg-white p-1 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-50"
      aria-label="Toggle Theme"
      type="button"
    >
      <div
        className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white dark:bg-black shadow-md transition-all duration-500 ease-in-out ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white text-white" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-orange-400 text-orange-400" aria-hidden="true">
            <path d="M12 3a1 1 0 0 1 1 1v1.2a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Zm0 15.8a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.2a1 1 0 0 1 1-1ZM4.93 4.93a1 1 0 0 1 1.41 0l.85.85a1 1 0 1 1-1.42 1.42L4.93 6.35a1 1 0 0 1 0-1.42Zm11.9 11.9a1 1 0 0 1 1.42 0l.85.85a1 1 0 1 1-1.42 1.42l-.85-.85a1 1 0 0 1 0-1.42ZM3 11a1 1 0 0 1 1-1h1.2a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm15.8 0a1 1 0 0 1 1-1H21a1 1 0 1 1 0 2h-1.2a1 1 0 0 1-1-1ZM4.93 19.07a1 1 0 0 1 0-1.42l.85-.85a1 1 0 1 1 1.42 1.42l-.85.85a1 1 0 0 1-1.42 0Zm11.9-11.9a1 1 0 0 1 0-1.42l.85-.85a1 1 0 0 1 1.42 1.42l-.85.85a1 1 0 0 1-1.42 0Zm-7.78 3.79a5 5 0 1 1 7.78 0 5 5 0 0 1-7.78 0Z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
