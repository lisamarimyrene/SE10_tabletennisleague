import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// * Context API.
const TechnologyContext = createContext();

const TechnologyProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false); // Set the loggedIn state to false default
    const [accessToken, setAccessToken] = useState(null); // Initialize the access token to null
    const [userRole, setUserRole] = useState(null);

    // Get accessToken (post)
    function getAccessToken() {
        // Initialize credentials
        const axiosConfig = axios.create({
            withCredentials: true
        })
        axiosConfig
            .post("http://localhost:5005/api/auth/refresh") // axios post
            .then((res) => {
                setAccessToken(res.data.accessToken); // After sumbitting save accessToken
                setLoggedIn(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Render the getAccessToken function
    useEffect(() => {
        getAccessToken();
    }, [])

    // Render decode role
    useEffect(() => {
        if (!accessToken) {
            return;
        }
        const role = jwt_decode(accessToken).role;
        setUserRole(role); // Set the user role in the context/provider state
    }, [accessToken]);


    // Wrap the context around all children (App)
    return (
        <TechnologyContext.Provider
            value={{
                loggedIn, setLoggedIn,
                accessToken, setAccessToken,
                userRole, setUserRole,
            }}>
            {children}
        </TechnologyContext.Provider>
    );
};

export { TechnologyContext, TechnologyProvider };
