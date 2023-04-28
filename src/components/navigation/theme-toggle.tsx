import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div>
      <button
        className="m-1 rounded-full bg-primary p-2 text-secondary hover:bg-primary/90"
        onClick={toggleTheme}
      >
        {theme === "dark" && <MdDarkMode />}
        {theme === "light" && <MdLightMode />}
      </button>
    </div>
  );
};

export default ThemeToggle;
