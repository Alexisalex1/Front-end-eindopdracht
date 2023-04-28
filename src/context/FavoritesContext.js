import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext([]);

function FavoritesContextProvider({ children }) {
    const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
        const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');

        return storedFavoriteRecipes ? JSON.parse(storedFavoriteRecipes) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }, [favoriteRecipes]);
    return (
        <FavoritesContext.Provider value={[favoriteRecipes, setFavoriteRecipes]}>
            {children}

        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;