import {Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "../../pages/forms/loginForm";
import RegisterForm from "../../pages/forms/RegisterForm";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

{/*this component is a button that switches between the register or login components, depending on the authForm state. */}

function FormSwitchButton() {
    const {setStatus } = useContext(AuthContext);
    const [authForm, setAuthForm] = useState(true);
    const toggleAuthForm = () => setAuthForm(!authForm);
    const navigate = useNavigate()

    const handleToggleAuthForm = () => {
        setStatus("pending");
        toggleAuthForm();
        navigate(authForm ? "/register" : "/login");

    }
    return (
        <div>
            <Routes>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
            </Routes>
            <button className="toggle-auth-button" onClick={handleToggleAuthForm}>
                {authForm
                    ? "Don't have an account? Register here"
                    : "Already have an account? Log in here"}
            </button>
        </div>
    );
}



export default FormSwitchButton;
