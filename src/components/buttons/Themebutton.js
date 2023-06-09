import React, { useContext, useEffect } from 'react';
import {TbBulbOff,TbBulb} from 'react-icons/tb'
import {ThemeContext} from "../../context/ThemeContext";
import "./Themebutton.css"


{/* A simple button to toggle between dark- and light.css. The toggling is in the useContext; ThemeContext. This changes the icon/*/}
function ThemeButton() {
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.className = themeContext.theme;
    }, [themeContext]);


    return (
        <button className="theme-button" onClick={themeContext.setTheme}>
            <div>
                {themeContext.theme === "light" ? <TbBulb/> : <TbBulbOff/>}
            </div>
        </button>
    );
}

export default ThemeButton;
