import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./home";
import SpecificDiets from "./specificDiets/specificDiets";
import SearchPage from "./searchPage/searchPage";
import Recipes from "./recipes";
import QuestionSearch from "../components/cards/questionCards";
import FavoriteList from "./favoriteList";
import PageNotFound from "./pageNotFound";
import AfterLogin from "./afterLoginPage";





function PrivatePages() {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/diets/:type" element={<SpecificDiets/>}/>
            <Route path="/searched/:search" element={<SearchPage/>}/>
            <Route path="/recipe/:name" element={<Recipes/>}/>
            <Route path="/questions" element={<QuestionSearch/>}/>
            <Route path="/favorites" element={<FavoriteList/>}/>
            <Route path="*" element={<PageNotFound/>}/>
            <Route path="choice" element={<AfterLogin/>}/>
        </Routes>
    );
}

export default PrivatePages;