import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "./recipes.css";
import AddToFavorites from "../components/buttons/FavoriteButton";

{/*This function is the baseline for many other pages and components. in here the recipe out of a list of recipes wil be shown. More specifically, the details. */}
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

    {/*This useEffect will call the API to retrieve the requested details. If no detail for whatever reason can be fetched, it wil set the error useState and the error will be shown instead if the recipe details.*/}
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

    {/*This code is the fundament for the different buttons, which will show chosen details. */}
    return (
        <div className="recipes-wrapper">
            <div className="image-container">
                {details.image && <img className="recipes-image" src={details.image} alt={details.label} />}
                {details.image && <AddToFavorites recipe={details} />}
            </div>
            <h2 className="recipes-title">{details.label}</h2>

            {/*This will relocate the user to the site. it will pop up a new window.*/}
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
                {/*This will show the nutrient in a bar-diagram. Note that I created a matchingNutrient to check if daily intake info is available and if not, it won't display it  */}
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
                {/*this shows the daily intake. What's so special about this part, is that is in the essence, the same as total intake, but this is divided by the yield */}
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
                {/*This shows the ingredients with the image of the ingredient.*/}
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
