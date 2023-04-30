import React, { createContext, useState, useEffect } from 'react';

{/*This creates a new context object, to be used at every level*/}
export const FavoritesContext = createContext([]);

{/*Creates the useState favoriteRecipes. The useEffect saves the favoriteRecipes to the localstorage when it changes */}
function FavoritesContextProvider({ children }) {
    const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
        const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
        return storedFavoriteRecipes ? JSON.parse(storedFavoriteRecipes) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }, [favoriteRecipes]);

    {/*returning the values as context values makes it so the children components can make use out of it*/}
    return (
        <FavoritesContext.Provider value={[favoriteRecipes, setFavoriteRecipes]}>
            {children}

        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;