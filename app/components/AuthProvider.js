"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect, createContext, useContext } from "react";

//Theme Context
const ThemeContext = createContext(null);

// AuthProvider component
export default function AuthProvider({ children }) {
  const [theme, setTheme] = useState('light');

  //Initial load theme
  useEffect(() => {
    // Check for localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []); // Empty array ensures this runs only once on mount

  // Effect to be applied on theme change
  useEffect(() => {
    if (theme === 'dark') {
      // Adds 'dark' class to <html> element
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Removes 'dark' class from <html> element
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]); // Runs every time the 'theme' state changes

  return (
    // Provides the theme and session to all children
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeContext.Provider>
  );
}

// 6. Create a custom hook to easily access the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a AuthProvider");
  }
  return context;
};