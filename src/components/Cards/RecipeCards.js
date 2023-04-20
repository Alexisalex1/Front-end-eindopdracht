import React from "react";
import PropTypes from "prop-types";
import AddToFavorites from "../Buttons/FavoriteButton";


import "./RecipeCards.css";

function Card(props) {
    const { id, label, image } = props;

    return (
        <div key={id}>
            <div className="card-container">
                    <p className="card-label">{label}</p>
                    <img className="card-image"
                         src={image}
                         alt={label} />

                <div className="gradient"></div>
            </div>
        </div>
    );
}

Card.propTypes = {

    label: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default Card;
