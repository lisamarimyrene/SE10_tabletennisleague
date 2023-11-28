import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavbarDesktop.css";
import { TechnologyContext } from "../../providers/TechnologyProvider";;
import axios from "axios";

// * NavbarDesktop component
export default function NavbarDesktop() {
    const { loggedIn, setLoggedIn, setAccessToken, userRole } = useContext(TechnologyContext);

    // Define an array of protected routes
    const protectedRoutes = [
        { name: "Players", link: "/Players/leaderboard" },
        { name: "Matches", link: "/Matches" }
    ];

    // Check the roles to render the navbar differently
    if (userRole === "admin") {
        protectedRoutes.push({ name: "Admin", link: "/profile/ProfileInfo" });

    } else {
        protectedRoutes.push({ name: "Profile", link: "/profile/ProfileInfo" });
    }

    const location = useLocation(); // useLocation to get the current url/path
    const navigate = useNavigate();

    // Handle logout functionality
    const handleLogout = () => {
        const confirms = confirm("Are you sure you want to logout?")
        
        if (confirms) {
            setLoggedIn(false);
            setAccessToken(null);
            // Initialize credentials
            const axiosConfig = axios.create({
                withCredentials: true
            })
            axiosConfig
            .post("http://localhost:5005/api/auth/logout")
            .then((res) => {
                navigate("/login");men
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <div className="nav-container">
            <div className="logo-container">
                <h1 className="logo">TABLE TENNIS LEAGUE APP &#127955;</h1>
            </div>
            <div className="navbarlist-container">
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    {protectedRoutes.map((route, index) => {
                        if (loggedIn) {
                            return (
                                <li key={index}>
                                    <Link to={route.link} className={location.pathname.startsWith(route.link) ? "active" : ""} >{route.name}</Link>
                                </li>
                            );
                        } else {
                            return null; // Exclude protected routes when not logged in
                        }
                    })}
                    {loggedIn ? (
                        <li>
                            <Link className={location.pathname === "/logout" ? "active" : ""} onClick={handleLogout}>Log out</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
