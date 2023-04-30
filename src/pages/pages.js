import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./home";
import SpecificDiets from "./specificDiets/specificDiets";
import SearchPage from "./searchPage/searchPage";
import Recipes from "./recipes";
import QuestionSearch from "../components/cards/questionCards";
import FavoriteList from "./favoriteList";
import ThemeButton from "../components/buttons/themebutton";
import Searchbar from "../components/searchbar/searchbar";
import Category from "../components/categories/categories";

function Pages() {

        return (
            <div>
                <ThemeButton />
                <div className="nav-padding">
                    <NavLink className="logo-icon" to={"/home"} >
                        Homepage
                    </NavLink>
                    <NavLink className="logo-icon" to={"/questions"} >
                        Let me find you a recipe!
                    </NavLink>
                    <NavLink className="logo-icon" to={"/favorites"} >
                        Favorites list
                    </NavLink>
                </div>
                <div>
                    <Searchbar />
                    <Category />
                </div>
                <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/diets/:type" element={<SpecificDiets/>}/>
                <Route path="/searched/:search" element={<SearchPage/>}/>
                <Route path="/recipe/:name" element={<Recipes/>}/>
                <Route path="/questions" element={<QuestionSearch/>}/>
                <Route path="/favorites" element={<FavoriteList/>}/>
            </Routes>
            </div>
    );
}

export default Pages;