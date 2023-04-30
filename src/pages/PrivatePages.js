import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import SpecificDiets from "./specificDiets/SpecificDiets";
import SearchPage from "./searchPage/SearchPage";
import Recipes from "./Recipes";
import QuestionSearch from "../components/cards/QuestionCards";
import FavoriteList from "./FavoriteList";
import PageNotFound from "./PageNotFound";
import AfterLogin from "./AfterLoginPage";

{/*Routes all different pages to certain url links. These are the pages these are only available once authenticated (logged in)*/}
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