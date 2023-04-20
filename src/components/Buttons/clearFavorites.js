import React from 'react';
import "./clearFavorites.css"

const ClearFavorites = ({ clearFavorites }) => {
    return (
        <button className="clear-favorites-btn" onClick={clearFavorites}>
            Clear All Favorites
        </button>
    );
};

export default ClearFavorites;