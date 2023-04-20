import {createContext, useState, useEffect} from "react";
import "../light.css"
import "../dark.css"

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [theme, toggleTheme] = useState("light");


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
    }, [theme]);

    const setTheme = () => {
        toggleTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    console.log(theme)

    return (
     <ThemeContext.Provider value={{ theme, setTheme}}>
         {children}
     </ThemeContext.Provider>
 )
}

export default ThemeContextProvider