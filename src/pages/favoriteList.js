import React, { useContext } from 'react';
import {FavoritesContext} from "../context/FavoritesContext";
import Card from "../components/Cards/RecipeCards";
import idExtract from "../components/idExtract";
import {Link} from "react-router-dom";
import "./favoriteList.css"
import ClearFavorites from "../components/Buttons/clearFavorites";
import AddToFavorites from "../components/Buttons/FavoriteButton";


const FavoritesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoritesContext);
    const clearFavorites = () => {
        setFavoriteRecipes([]);
    }
    return (
        <div>
            <h1>My Favorite Recipes</h1>
            <ClearFavorites clearFavorites={clearFavorites}  />
            <div className="favorite-grid">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe) =>{
                        const uri = recipe.uri || '';
                        const id = idExtract(uri);

                        return (
                            <Link  to={"/recipe/" + id}>
                                <Card
                                    label={recipe.label}
                                    image={recipe.image }
                                />
                            </Link>)})) :
                    (<p>You haven't added any recipes to your favorites yet.</p>)
                }
            </div>
        </div>
    );
};

export default FavoritesPage;
