import axios from 'axios';
import React, { createContext, useState, useEffect } from "react";
import Login from "./components/authenticateForm/loginForm";
import Register from "./components/authenticateForm/registerForm";

export const AuthenticateContext = createContext();

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api';

function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [authForm, setAuthForm] = useState(true);

    // Add an Axios interceptor to include the authorization header with the accessToken on every request
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
        if (token) {
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            setIsLoggedIn(true);
            setUsername(JSON.parse(localStorage.getItem('user')).username);
        }
    }, []);

    const register = async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                "username": username,
                "email": email,
                "password": password,
                "info": "dit is info",
                "role": ["user"],
            });
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsLoggedIn(true);
                setUsername(response.data.username);
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signin`, {
                "username": username,
                "password": password,
            });
            if (response.data.accessToken && response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsLoggedIn(true);
                setUsername(response.data.username);

                // Add the authorization header to the Axios instance after successful login
                axios.interceptors.request.use(
                    config => {
                        config.headers.authorization = `Bearer ${response.data.accessToken}`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
            }

            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthenticateContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                username: username,
                login: login,
                register: register,
                logout: logout,
            }}
        >
            {authForm ? <Login onSubmit={login} /> : <Register onSubmit={register} />}
            {children}
        </AuthenticateContext.Provider>
    );
}

export default AuthContextProvider;
