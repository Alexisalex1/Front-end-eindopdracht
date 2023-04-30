import React, { useContext } from 'react';
import {FavoritesContext} from "../context/FavoritesContext";
import RecipeCard from "../components/cards/RecipeCards";
import idExtract from "../components/IdExtract";
import {Link} from "react-router-dom";
import "./FavoriteList.css"
import ClearFavorites from "../components/buttons/ClearFavorites";


{/*This renders the favorite list and will be updated accordingly. it uses useContext to not lose all stored data*/}
const FavoritesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoritesContext);
    const clearFavorites = () => {
        setFavoriteRecipes([]);
    }

    {/*The recipes are rendered here and the make use out of the RecipeCard component to have fewer code lines. Note that the idExtract is used here to cut the ID of the uri and is then used to send it to /recipe/:name to the Recipes.js*/}
    return (
        <main>
            <h1>My Favorite Recipes</h1>
            <ClearFavorites clearFavorites={clearFavorites}  />
            <div className="favorite-grid">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe) =>{
                        const uri = recipe.uri || '';
                        const id = idExtract(uri);

                        return (
                            <Link  to={"/recipe/" + id}>
                                <RecipeCard
                                    label={recipe.label}
                                    image={recipe.image }
                                />
                            </Link>)})) :
                    (<p>You haven't added any recipes to your favorites yet.</p>)
                }
            </div>
        </main>
    );
};

export default FavoritesPage;
