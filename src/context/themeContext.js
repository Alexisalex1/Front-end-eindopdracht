import { createContext, useState, useEffect, useRef } from "react";
import "../light.css";
import "../dark.css";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [theme, toggleTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme !== null ? storedTheme : "light";
    });

    const themeStyleRef = useRef();
    const darkThemeStyleRef = useRef();

    useEffect(() => {
        const themeStyle = themeStyleRef.current;
        const darkThemeStyle = darkThemeStyleRef.current;
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
            <link rel="stylesheet" href="light.css" ref={themeStyleRef} />
            <link rel="stylesheet alternate" href="dark.css" ref={darkThemeStyleRef} />
            {children}
        </ThemeContext.Provider>
    );
}

ThemeContextProvider.defaultProps = {
    children: null,
};

export default ThemeContextProvider;
