import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated);
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;