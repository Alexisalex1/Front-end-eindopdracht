import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import "./searchbar.css";

{/*This function uses the users input as a query input that is navigated to /searched/:input. This will go to the component searchPage. where it will be used to do an API request. the onsubmit calls the submitHandler*/}
function Searchbar() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input)
    };

    return (
        <form
            className="form-decoration"
            onSubmit={submitHandler}
        >
            <div className="form-positioning">
                <FaSearch className="search-icon"></FaSearch>
                <input
                    placeholder="Search..."
                    type="text"
                    className="input-field-search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </form>
    );
}



export default Searchbar;