import React, { useContext, useState, useEffect} from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import {FavoritesContext} from "../../context/favoritesContext";
import './FavoriteButton.css';

{/*This creates a button in a form of a heart in the recipe page. if clicked on, it will add the recipe to the favoritesList page. This also makes use of useContext, so that it is possible to still have the list intact while the page refreshes or is rendered from a different page.*/}

const AddToFavorites = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoritesContext);

    useEffect(() => {
        const isRecipeFavorite = favoriteRecipes.some(
            (favoriteRecipe) => favoriteRecipe.label === recipe.label
        );
        setIsFavorite(isRecipeFavorite);
    }, [favoriteRecipes, recipe.label]);


    const handleAddToFavorites = () => {
        if (isFavorite) {
            const newFavoriteRecipes = favoriteRecipes.filter(
                (favoriteRecipe) => favoriteRecipe.label !== recipe.label
            );
            setFavoriteRecipes(newFavoriteRecipes);
        } else {
            setFavoriteRecipes([...favoriteRecipes, recipe]);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            className="favorite-btn"
            onClick={handleAddToFavorites}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
            <div className="button-content">
                {isFavorite ? <MdOutlineFavorite size={40} /> : <MdOutlineFavoriteBorder size={40} />}
                <div className="button-text"></div>
            </div>
        </button>
    );
};

export default AddToFavorites;
