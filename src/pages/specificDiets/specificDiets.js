import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Cards/RecipeCards";
import "./specificDiets.css";
import idExtract from "../../components/idExtract";

function SpecificDiets() {
    const [diet, setDiet] = useState([]);
    let params = useParams();

    const getDiets = async (diet) => {
        const data = await fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&diet=${diet}&health=vegan&health=vegetarian&mealType=Dinner&dishType=Main%20course&dishType=Side%20dish&random=true`
        );
        const recipes = await data.json();
        setDiet(recipes.hits);
        console.log(recipes.hits);
    };

    useEffect(() => {
        getDiets(params.type);
        console.log(params);
    }, [params.type]);

    return (
        <div className="diet-grid">
            {diet.map((recipe) => {
                const { uri, label, image } = recipe.recipe;
                const id = idExtract(uri);
                return (
                    <div key={id}>
                        <Link to={`/recipe/${id}`}>
                            <Card
                                id={id}
                                label={label}
                                image={image} />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default SpecificDiets;
