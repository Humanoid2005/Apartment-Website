import React, { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import LoadingPage from "../components/LoadingPage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [houseNumber, setHouseNumber] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { data: token, pending, error } = useFetch("http://localhost:8000/api/is-authenticated");

    useEffect(() => {
        if (error) {
            console.log("Authentication Token Check Error: ", error);
        }

        if (!pending && token) {
            if (token.status) {
                console.log(token);
                setHouseNumber(token.house_number);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
    }, [token, pending, error]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <LoadingPage message={"Loading..."}/>;
    }

    return (
        <AuthContext.Provider value={{ houseNumber, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
