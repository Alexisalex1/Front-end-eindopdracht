import React, {useContext} from "react";
import { useNavigate } from "react-router-dom"
import "./AfterLoginPage.css"
import {AuthContext} from "../context/AuthContext";

{/*After the login of the user, this page is rendered. It wil render the user's name (which uses useContext) and will render a question with two cards like buttons. */}
function AfterLogin() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    function handleButtonClick(route) {
        navigate(route);
    }

    return (
        <main>
            <h1 className="after-login-question">welcome {user}! What would you like to do?</h1>
            <div className="after-login-answers">
            <button className="after-login-answer" onClick={() => handleButtonClick('/questions')}>
                Answer Questions
               (automatic search)
            </button>
            <button  className="after-login-answer" onClick={() => handleButtonClick('/')}>
               Use the search tool (manual search)
            </button>
            </div>
        </main>
    );
}

export default AfterLogin;