import React, { useContext, useState, useEffect} from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import {FavoritesContext} from "../../context/FavoritesContext";
import './FavoriteButton.css';

const AddToFavorites = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoritesContext);
    console.log(favoriteRecipes)
    console.log(FavoritesContext)

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
