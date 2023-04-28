import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import "./searchPage.css";
import idExtract from "../../components/idExtract";
import axios from "axios";
import Card from "../../components/Cards/RecipeCards";


function SearchPage() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [error, setError] = useState(null);
    let params = useParams();
    const { search } = useParams();
    const searchValues = search.split(",");

    const getSearchPage = async (searchedRecipes) => {
        try {
            const response = await axios.get(
                `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&q=${searchedRecipes}&random=true`
            );
            const recipes = response.data;
            setSearchedRecipes(recipes.hits);
            console.log(recipes.hits);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Something went wrong..");
        }
    };

    useEffect(() => {
        getSearchPage(params.search);
    }, [params.search]);

    const handleRetry = () => {
        setError(null);
        getSearchPage(params.search);
    };

    return (
        <div className="searchPage-grid">
            {error ? (
                <div>
                    <p>{error}</p>
                    <button className="retry-button" onClick={handleRetry}>Retry</button>
                    or go back to{" "}
                    <NavLink className="retry-button" to="/">
                        Home
                    </NavLink>
                </div>
            ) : searchedRecipes.length > 0 ? (
                searchedRecipes.map((recipe) => {
                    return (
                        <div key={idExtract(recipe.recipe.uri)}>
                            <Link to={"/recipe/" + idExtract(recipe.recipe.uri)}>
                                <Card image={recipe.recipe.image} label={recipe.recipe.label} />
                            </Link>
                        </div>
                    );
                })
            ) : (
                searchedRecipes.length === 0 && (
                    <div >
                        <p className="retry-container">Nothing could be found. Try the searchbar.  </p>
                        <NavLink to="/questions">You can also click here to go the questions.</NavLink>

                    </div>
                )
            )}
        </div>
    );
}

export default SearchPage;
