import { createContext, useState, useEffect } from "react";
import "../light.css";
import "../dark.css";

{/*This creates a new context object, to be used at every level.*/}
export const ThemeContext = createContext();

{/*This function takes the children prop as a parameter.*/}
    function ThemeContextProvider({ children }) {
        const storedTheme = localStorage.getItem("theme");
        const [theme, toggleTheme] = useState(storedTheme || "light");

        {/*The useEffect updates the stylesheet depending on which is now active. It stores the theme in localstorage.*/}
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


        {/*returning the values as context values makes it so the children components can make use out of it*/}
        return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        );
}

export default ThemeContextProvider;
