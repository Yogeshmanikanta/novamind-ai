import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("nm-theme") === "dark");

  useEffect(() => {
    localStorage.setItem("nm-theme", isDark ? "dark" : "light");
    document.body.style.background = isDark ? "#0a0a14" : "#f0f2f5";
    document.body.style.color = isDark ? "#e2e8f0" : "#1a202c";
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }