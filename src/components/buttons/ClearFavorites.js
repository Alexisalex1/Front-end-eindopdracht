import React from 'react';
import "./ClearFavorites.css"

{/* this is the button to clear all favorites in the favoriteList page */}

const ClearFavorites = ({ clearFavorites }) => {
    return (
        <button className="clear-favorites-btn" onClick={clearFavorites}>
            Clear All Favorites
        </button>
    );
};

export default ClearFavorites;