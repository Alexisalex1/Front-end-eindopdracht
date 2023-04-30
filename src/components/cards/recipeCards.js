import React from "react";
import PropTypes from "prop-types";



import "./recipeCards.css";

{/*This function displays the recipe cards it uses the three props to display */}
function RecipeCard(props) {
    const { id, label, image } = props;

    return (
        <article key={id}>
            <figure className="card-container">
                    <p className="card-label">{label}</p>
                    <img className="card-image"
                         src={image}
                         alt={label} />

                <div className="gradient"></div>
            </figure>
        </article>
    );
}

{/*These are the requirements for this to work. Note that i didn't add the ID prop as required. I did this because Edamam sometimes don't define ID and because of that the site was not always working.*/}

RecipeCard.propTypes = {

    label: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default RecipeCard;
