import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import "./searchPage.css";
import idExtract from "../../components/idExtract";
import axios from "axios";
import RecipeCard from "../../components/cards/recipeCards";

{/*This function is responsible for renderen recipes based on the input of the user in the searchBar component. It will use the input as a query for the API request and returns the recipes.*/}
function SearchPage() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [error, setError] = useState(null);
    let params = useParams();
    const { search } = useParams();

    {/*THhis asyn function sends an API get request. if there are any errors, this will be displayed*/}
    const FetchRecipeBySearch = async (searchedRecipes) => {
        try {
            const response = await axios.get(
                `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&q=${searchedRecipes}&random=true`
            );
            const recipes = response.data;
            setSearchedRecipes(recipes.hits);
            setError(null);
        } catch (error) {
            setError("Something went wrong..");
        }
    };
    {/*This will make sure the function will be re-run when the query parameters change*/}
    useEffect(() => {
        FetchRecipeBySearch(params.search);
    }, [params.search]);

    const handleRetry = () => {
        setError(null);
        FetchRecipeBySearch(params.search);
    };

    return (
        <main className="searchPage-grid">
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
                    {/*Note that the idExtract is used here to cut the ID of the uri and is then used to send it to /recipe/:name to the recipes.js*/}
                    return (
                        <div key={idExtract(recipe.recipe.uri)}>
                            <Link to={"/recipe/" + idExtract(recipe.recipe.uri)}>
                                <RecipeCard image={recipe.recipe.image} label={recipe.recipe.label} />
                            </Link>
                        </div>
                    );
                })
            ) : (
                searchedRecipes.length === 0 && (
                    <div>
                        <p>Nothing could be found. Try the searchbar.  </p>
                        <NavLink className="to-question-button" to="/questions">You can also click here to go the questions.</NavLink>

                    </div>
                )
            )}
        </main>
    );
}

export default SearchPage;
