import React, { useEffect, useState } from "react";
import "./VeganVegaSliders.css"
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import axios from "axios";
import RecipeCard from "../cards/RecipeCards";
import idExtract from "../IdExtract";
import { Link } from "react-router-dom";


{/*This function creates two slidebars. One has vegan recipes and the other vega. To be able to make one component and still render both sliders, i created two API urls to be used.*/}
function Picks() {
    const [veganRecipe, setVeganRecipe] = useState([]);
    const [vegetarianRecipe, setVegetarianRecipe] = useState([]);
    const [error, setError] = useState(null);
    const veganBaseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&health=vegan&mealType=Dinner&dishType=Main%20course&dishType=Side%20dish&random=true`;
    const vegetarianBaseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&health=vegetarian&mealType=Dinner&dishType=Main%20course&dishType=Side%20dish&random=true`;

    {/*This fetches the API details with an request*/}
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const [veganResponse, vegetarianResponse] = await Promise.all([
                    axios.get(veganBaseUrl),
                    axios.get(vegetarianBaseUrl),
                ]);
                setVeganRecipe(veganResponse.data.hits);
                setVegetarianRecipe(vegetarianResponse.data.hits);
            } catch (error) {
                setError(error);

            }
        };
        getRecipes();
    }, []);

    {/*SplideOptions for both the sliders*/}
    const splideOptions = {
        arrows: true,
        pagination: false,
        drag: "free",
        gap: "5rem",
        perPage: 4,
        breakpoints: {
            1500: {
                perPage: 3,
            },
            1000: {
                perPage: 2,
            },
            576: {
                perPage: 1,
            },
        },
    };

    if (error) {
        return <p>{error.message}. Try reloading in a minute..</p>;
    }

    {/*Both vegan and vega are rendered here and the make use out of the RecipeCard component to have fewer code lines. Note that the idExtract is used here to cut the ID of the uri and is then used to send it to /recipe/:name to the Recipes.js*/}
    return (
        <main>
            <div className="picks-container">
                <h3>Vegan Picks</h3>
                <Splide options={splideOptions}>
                    {veganRecipe.map((hits) => {
                        return (
                            <SplideSlide key={hits.recipe.label}>
                                <Link to={"/recipe/" + idExtract(hits.recipe.uri)}>
                                    <RecipeCard label={hits.recipe.label} image={hits.recipe.image}/>
                                </Link>
                            </SplideSlide>
                        );
                    })}
                </Splide>
                <div className="picks-container">
                    <h3>Vegetarian Picks</h3>
                    <Splide options={splideOptions}>
                        {vegetarianRecipe.map((hits) => {
                            return (
                                <SplideSlide key={hits.recipe.label}>
                                    <Link to={"/recipe/" + idExtract(hits.recipe.uri)}>
                                        <RecipeCard label={hits.recipe.label} image={hits.recipe.image}/>
                                    </Link>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </div>
            </div>
        </main>
    );
}

export default Picks;
