import { createContext, useState, useEffect } from "react";
import "../light.css";
import "../dark.css";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const storedTheme = localStorage.getItem("theme");
    const [theme, toggleTheme] = useState(storedTheme || "light");

    useEffect(() => {
        const themeStyle = document.getElementById("theme-style");
        const darkThemeStyle = document.getElementById("theme-style-dark");

        if (theme === "light") {
            themeStyle.rel = "stylesheet";
            darkThemeStyle.rel = "stylesheet alternate";
        } else {
            themeStyle.rel = "stylesheet alternate";
            darkThemeStyle.rel = "stylesheet";
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const setTheme = () => {
        toggleTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
