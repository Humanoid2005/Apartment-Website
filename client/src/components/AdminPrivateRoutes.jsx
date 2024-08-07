import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const AdminPrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated,houseNumber } = useAuth();

    console.log(isAuthenticated);
    return (isAuthenticated&&houseNumber=="admin") ? <Component {...rest} /> : <Navigate to="/" />;
};

export default AdminPrivateRoute;