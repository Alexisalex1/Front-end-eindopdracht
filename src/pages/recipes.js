import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "./recipes.css";
import AddToFavorites from "../components/Buttons/FavoriteButton";

function Recipes() {
    const { name } = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("ingredients");
    const [error, setError] = useState(null);

    const buttons = [
        { label: "Total nutrition", tab: "total-nutrition" },
        { label: "Per serving", tab: "daily-intake" },
        { label: "Ingredients", tab: "ingredients" },
        { label: "Go to website", tab: "website", href: details.url }

    ];

    useEffect(() => {
        async function fetchDetails() {
            try {
                const result = await axios.get(
                    `https://api.edamam.com/api/recipes/v2/${name}?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`

                );
                setDetails(result.data.recipe);
                setError(null);

            } catch (e) {
                console.error(e);
                setError("Error fetching recipe details. Please try again later.");
            }
        }
        if (name) {
            fetchDetails();
        }
    }, [name]);

    if (error) {
        return <div className="error">{error} or return to or go back to{" "}
            <NavLink className="retry-button" to="/">
                Home
            </NavLink></div>;
    }
    return (
        <div className="recipes-wrapper">
            <div className="image-container">
                {details.image && <img className="recipes-image" src={details.image} alt={details.label} />}
                {details.image && <AddToFavorites recipe={details} />}
            </div>
            <h2 className="recipes-title">{details.label}</h2>


            <div className="recipes-info">
                {buttons.map(({ label, tab, href }) => (
                    href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`recipes-button ${activeTab === tab && "button-active"}`}>
                                {label}
                            </button>
                        </a>
                    ) : (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`recipes-button ${activeTab === tab && "button-active"}`}>
                            {label}
                        </button>
                    )
                ))}

                {activeTab === "total-nutrition" && (
                    <div className="nutrition-wrapper">
                        {details.totalDaily && Object.values(details.totalDaily).map(({ label, quantity, unit }) => {
                            const matchingNutrient = details.totalNutrients && Object.values(details.totalNutrients).filter(nutrient => nutrient.label === label)[0];
                            if (!matchingNutrient) {
                                return null;
                            }
                            const nutrientQuantity = Math.floor(matchingNutrient.quantity);

                            return (
                                <div className="nutrition-item" key={label}>
                                    <div className="nutrition-label">
                                        {label}:
                                        <span>  {nutrientQuantity}{matchingNutrient.unit}</span>
                                    </div>
                                    <div className="nutrition-bar">
                                        <div className="nutrition-fill" style={{ width: `${quantity}%` }}></div>
                                    </div>
                                    <div className="nutrition-value">{Math.floor(quantity)}{unit}</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeTab === "daily-intake" && (
                    <div className="nutrition-wrapper">
                        {details.totalDaily && Object.values(details.totalDaily).map(({ label, quantity, unit }) => {
                            const matchingNutrient = details.totalNutrients && Object.values(details.totalNutrients).filter(nutrient => nutrient.label === label)[0];
                            if (!matchingNutrient) {
                                return null;
                            }
                            const nutrientQuantity = Math.floor(matchingNutrient.quantity / details.yield);
                            const perServingQuantity = Math.floor(quantity / details.yield);

                            return (
                                <div className="nutrition-item" key={label}>
                                    <div className="nutrition-label">
                                        {label}:
                                        <span className="nutrient-quantity"> {nutrientQuantity}{matchingNutrient.unit}</span>
                                    </div>
                                    <div className="nutrition-bar">
                                        <div className="nutrition-fill" style={{ width: `${quantity / details.yield}%` }}></div>
                                    </div>
                                    <div className="nutrition-value">{perServingQuantity}{unit}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul className="recipes-ul">
                        {details.ingredients &&
                            details.ingredients.map((ingredient) => (
                                <li key={ingredient.calories}>
                                    {ingredient.image && (
                                        <div className="ingredient-image-wrapper"> <img className="ingredient-image" src={ingredient.image} alt={ingredient.text} />
                                        </div>)}
                                    {ingredient.text}


                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Recipes;
