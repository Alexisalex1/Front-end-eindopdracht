import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "../../components/cards/recipeCards";
import "./specificDiets.css";
import idExtract from "../../components/idExtract";
import axios from "axios";

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
            console.error(error);
            setError("Something went wrong..");
        }
    };

    useEffect(() => {
        getDiets(params.type);
    }, [params.type]);

    const handleRetry = () => {
        setError(null);
        getDiets(params.type);
    };

    return (
        <div className="diet-grid">
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
        </div>
    );
}

export default SpecificDiets;
