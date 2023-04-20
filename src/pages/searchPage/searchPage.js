import React, { useState, useEffect }from "react";
import {Link,useParams} from "react-router-dom";
import "./searchPage.css"
import idExtract from "../../components/idExtract";
import axios from "axios";
import Card from "../../components/Cards/RecipeCards";


function SearchPage() {
    const [searchedRecipes, setSearchedRecipes] = useState([])
    let params = useParams()
    const { search } = useParams();
    const searchValues = search.split(",");

    const getSearchPage = async (searchedRecipes) => {
        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&q=${searchedRecipes}&random=true`);
            const recipes = response.data;
            setSearchedRecipes(recipes.hits);
            console.log(recipes.hits);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSearchPage(params.search);
    }, [params.search]);


    return (
        <div className="searchPage-grid">
            {searchedRecipes.map((recipe) =>{
                return (
                    <div key={idExtract(recipe.recipe.uri)}>
                        <Link to={"/recipe/" + idExtract(recipe.recipe.uri)}>
                            <Card
                                image={recipe.recipe.image}
                                label={recipe.recipe.label}
                            />
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default SearchPage;