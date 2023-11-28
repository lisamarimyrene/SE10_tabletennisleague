// * Protected routes is retrieved from the video resource from Frontend lecture Module 6 - HOCs
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { TechnologyContext } from "../providers/TechnologyProvider";

// * Protected routes outlet
const ProtectedRoutes = () => {
    // Get the loggedIn state from the context api
    const { loggedIn } = useContext(TechnologyContext); 

    // Tell React when nested elements will be rendered, depending on the loggedIn state.
    return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
