import React from "react";
import { useNavigate } from "react-router-dom"
import "./AfterLoginPage.css"

function AfterLogin() {
    const navigate = useNavigate();

    function handleButtonClick(route) {
        navigate(route);
    }

    return (
        <div>
            <h1 className="after-login-question">What would you like to do?</h1>
            <div className="after-login-answers">
            <button className="after-login-answer" onClick={() => handleButtonClick('/questions')}>
                Answer Questions
               (automatic search)
            </button>
            <button  className="after-login-answer" onClick={() => handleButtonClick('/')}>
               Use the search tool (manual search)
            </button>
            </div>
        </div>
    );
}

export default AfterLogin;