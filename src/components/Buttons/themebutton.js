import React, { useContext, useEffect } from 'react';
import {TbBulbOff,TbBulb} from 'react-icons/tb'
import {ThemeContext} from "../../context/themeContext";



function ThemeButton() {
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.className = themeContext.theme;
    }, [themeContext]);


    return (
        <button onClick={themeContext.setTheme}>
            <div>
                {themeContext.theme === "light" ? <TbBulb/> : <TbBulbOff/>}
            </div>
        </button>
    );
}

export default ThemeButton;
