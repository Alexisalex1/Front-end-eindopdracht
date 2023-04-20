import React from "react";


function extractIdFromUri(uri) {


    return (
        uri.split('#recipe_').pop()
    );
}

export default extractIdFromUri;