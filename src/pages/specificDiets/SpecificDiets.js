import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "../../components/cards/RecipeCards";
import "./SpecificDiets.css";
import idExtract from "../../components/IdExtract";
import axios from "axios";

{/*This function fetches recipes from an API request based on the specific diets. The diets are clickable buttons*/}
function SpecificDiets() {
    const [diet, setDiet] = useState([]);
    const [error, setError] = useState(null);
    const params = useParams();

    const getDiets = async (diet) => {
        try {
            const response = await axios.get(
                `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&diet=${diet}&health=vegan&health=vegetarian&mealType=Dinner&dishType=Main%20course&dishType=Side%20dish&random=true`
            );
            const recipes = response.data;
            setDiet(recipes.hits);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    {/*When a button is pushed, the type parameter changes. This useEffect wil call the getDiets to do another API request*/}
    useEffect(() => {
        getDiets(params.type);
    }, [params.type]);

    const handleRetry = () => {
        setError(null);
        getDiets(params.type);
    };

    {/*The recipes are rendered here and the make use out of the RecipeCard component to have fewer code lines. Note that the idExtract is used here to cut the ID of the uri and is then used to send it to /recipe/:name to the Recipes.js*/}
    return (
        <main className="diet-grid">
            {error ? (
                <div>
                    <p>{error}</p>
                    <button className="retry-button" onClick={handleRetry}>Retry</button>
                    or go back to{" "}
                    <Link className="retry-button" to="/">
                        Home
                    </Link>
                </div>
            ) : (
                diet.map((recipe) => {
                    const { uri, label, image } = recipe.recipe;
                    const id = idExtract(uri);
                    return (
                        <div key={id}>
                            <Link to={`/recipe/${id}`}>
                                <RecipeCard id={id} label={label} image={image} />
                            </Link>
                        </div>
                    );
                })
            )}
        </main>
    );
}

export default SpecificDiets;
