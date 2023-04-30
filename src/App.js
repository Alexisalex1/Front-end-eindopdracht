import React, { useContext} from "react";
import PrivatePages from "./pages/PrivatePages";
import Category from "./components/categories/Categories";
import Searchbar from "./components/searchbar/Searchbar";
import "./App.css"
import {NavLink} from "react-router-dom";
import ThemeButton from "./components/buttons/Themebutton";
import "./light.css"
import "./dark.css"
import { AuthContext } from "./context/AuthContext";
import LogoutButton from "./components/buttons/LogoutButton";
import PublicPages from "./pages/PublicPages";


function App () {
    const { user } = useContext(AuthContext);
    {/*this part will render the privatePages and other components/pages or the publicPages, depending on the user via useContext. The user is updated in the autProvider depending on if user is logged in or not*/}
    return(
        <div>
            {user ?
                (<div>
                    <nav className="navbar">
                        <div className="navbar-container">
                            <ThemeButton/>
                            <NavLink className="navbar-logo" to={"/"} >
                                Homepage
                            </NavLink>
                            <NavLink className="navbar-logo" to={"/questions"} >
                                Let me find you a recipe!
                            </NavLink>
                            <NavLink className="navbar-logo" to={"/favorites"} >
                                Favorites list
                            </NavLink>
                            <LogoutButton />
                        </div>
                    </nav>

                        <div className="padding-bottom">
                        <Searchbar/>
                        <Category/>
                        <PrivatePages/>
                    </div>
                </div>
                ) : (
                    <div className="form-container">
                        <ThemeButton/>
                        <PublicPages />

                    </div>
                )}
        </div>

);
}

export default App;
