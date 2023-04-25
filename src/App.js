import React, {useState, useContext} from "react";
import Pages from "./pages/pages";
import "./App.css"
import "./light.css"
import "./dark.css"
import {Routes, Route} from "react-router-dom";
import Login from "./components/authenticateForm/loginForm";
import Register from "./components/authenticateForm/registerForm";
import PrivateRoute from "./PrivateRoute";
function App () {

    return(

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pages" element={<PrivateRoute><Pages /></PrivateRoute>} />

            </Routes>

    );
}
export default App;
