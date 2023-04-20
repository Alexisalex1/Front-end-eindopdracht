import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import "./searchbar.css";


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
                    className="input-field"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </form>
    );
}



export default Searchbar;