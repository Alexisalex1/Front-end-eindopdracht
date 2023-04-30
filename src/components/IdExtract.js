import React from "react";

{/*A component that extracts the recipe ID from the uri as there was no other way to obtain a recipe id. the split, splits the ID from the uri and creates an array, which the .pop call the last object in the array and returns that part.*/}
function extractIdFromUri(uri) {


    return (
        uri.split('#recipe_').pop()
    );
}

export default extractIdFromUri;