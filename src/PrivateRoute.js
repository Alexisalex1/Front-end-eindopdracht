import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticateContext} from "./authcontext";
import {Route} from "react-router-dom";



function PrivateRoute({ children, ...rest }) {
    const { isLoggedIn } = useContext(AuthenticateContext);
    console.log(isLoggedIn)
    return (
        <Route
            {...rest}
            element={isLoggedIn ? children : <Navigate to="/login" replace />}
        />
    );
}
export default PrivateRoute