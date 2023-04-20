import React from "react";
import Pages from "./pages/pages";
import Category from "./components/categories/categories";
import Searchbar from "./components/Searchbar/searchbar";
import "./App.css"
import { NavLink } from "react-router-dom";
import ThemeButton from "./components/Buttons/themebutton";
import ThemeContextProvider from "./context/themeContext";
import "./light.css"
import "./dark.css"

function App () {


    return(
        <ThemeContextProvider>
            <div>
                <ThemeButton/>
                <div className="nav-padding">
                    <NavLink className="logo-icon" to={"/"} >
                        Homepage
                    </NavLink>
                    <NavLink className="logo-icon" to={"/questions"} >
                        Let me find you a recipe!
                    </NavLink>
                    <NavLink className="logo-icon" to={"/favorites"} >
                        Favorites list
                    </NavLink>
                </div>
                <Searchbar/>
                <Category/>
                <Pages/>
            </div>
        </ThemeContextProvider>
    );
}
export default App;
