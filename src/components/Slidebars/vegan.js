import React,{useEffect,useState} from "react";
import "./vegan.css"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import {Link}from "react-router-dom"
import idExtract from "../idExtract";
import axios from "axios";
import Card from "../Cards/RecipeCards";


function Vegan() {
    const [veganRecipe, setVeganRecipe] = useState([])
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&health=vegan&mealType=Dinner&dishType=Main%20course&dishType=Side%20dish&random=true`

    useEffect(() => {
        const getVegan = async () => {
            try {
                const response = await axios.get(baseUrl);
                const recipes = response.data;
                setVeganRecipe(recipes.hits);
            } catch (error) {
                console.error(error);

            }
        };
        getVegan();
    }, []);

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

    return (
        <div>
            <div className="div-wrapper">
                <h3>Vegan Picks</h3>
                <Splide options={splideOptions}>
                    {veganRecipe.map((hits) => {
                        return (
                            <SplideSlide key={hits.recipe.label}>
                                <Link to={"/recipe/" + idExtract(hits.recipe.uri)}>
                                    <Card
                                        label={hits.recipe.label}
                                        image={hits.recipe.image}
                                    />
                                </Link>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </div>
        </div>
    );
}

export default Vegan;