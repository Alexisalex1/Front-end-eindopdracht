import React, { useState, useEffect } from "react";
import {AuthContext} from "./AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

{/*This component sets up different useStates to be used in different parts in the application via useContext. */}
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("pending");
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        if (accessToken && user) {
            setUser(JSON.parse(user));
        } else {
            setUser(null);
        }

    }, []);


    {/*This part sens a post request to the Novi-backend API with using the 'username' and 'password' as given parameters. It updates the user state depending on if it is successful or not. it also updates the localstorage with an accesstoken and user*/}
    const login = async ( username, password) => {
        setStatus("pending");
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.username));
            setUser(response.data.username);
            setStatus("done");
            navigate("/choice")
        } catch (error) {
            setStatus("error");
        }
    };
    {/*This also sends a post request to the Novi-backend API with and extra parameter. It uses the username, password and email. depending on the successfulness it sets the status state to either error or done.*/}
    const register = async (username, password, email) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    username: username,
                    email: email,
                    password: password,
                    info: "dit is info",
                    role: ["user"],
                },
            );
            setStatus("done");
            setLoading(false)
        } catch (error) {
            setStatus("error");
            setErrorMessage(error.response.data.message)


        }
    };

    {/*This removes the user and accesstoken provided in the login call*/}
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login")
    };

    {/*returning the values as context values makes it so the children components can make use out of it*/}
    return (
        <AuthContext.Provider value={{ user, login, logout, status, setStatus, register, errorMessage, isLoading }}>
            {children}
        </AuthContext.Provider>);
}

export default AuthProvider;
