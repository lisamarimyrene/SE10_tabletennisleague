import React from "react";
import "./NavbarMobile.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { TechnologyContext } from "../../providers/TechnologyProvider";
import axios from "axios";

// * NavbarMobile component
export default function NavbarMobile() {
    // State that check if nav is extended
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    // Find the loggedIn state
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

    const location = useLocation();
    const navigate = useNavigate();

    // Handle the logout
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
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    // Function to close the navbar when a link is clicked
    const handleLinkClick = () => {
        setIsNavExpanded(false);
    };

    return (
    
        <div className="navMobile-container">
            <div className="navMobile-header">
                <div className="logoMobile-container">
                    <h1 className="logoMobile">TABLE TENNIS LEAGUE APP &#127955;</h1>
                </div>
                <button className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>
                    <svg className="hamburger" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.20002 7.46666C3.05868 7.46466 2.91834 7.49077 2.78718 7.54348C2.65601 7.59619 2.53663 7.67444 2.43597 7.77369C2.33531 7.87294 2.25537 7.9912 2.20082 8.12161C2.14626 8.25202 2.11816 8.39197 2.11816 8.53333C2.11816 8.67469 2.14626 8.81464 2.20082 8.94504C2.25537 9.07545 2.33531 9.19372 2.43597 9.29296C2.53663 9.39221 2.65601 9.47046 2.78718 9.52317C2.91834 9.57588 3.05868 9.60199 3.20002 9.59999H28.8C28.9414 9.60199 29.0817 9.57588 29.2129 9.52317C29.344 9.47046 29.4634 9.39221 29.5641 9.29296C29.6647 9.19372 29.7447 9.07545 29.7992 8.94504C29.8538 8.81464 29.8819 8.67469 29.8819 8.53333C29.8819 8.39197 29.8538 8.25202 29.7992 8.12161C29.7447 7.9912 29.6647 7.87294 29.5641 7.77369C29.4634 7.67444 29.344 7.59619 29.2129 7.54348C29.0817 7.49077 28.9414 7.46466 28.8 7.46666H3.20002ZM3.20002 14.9333C3.05868 14.9313 2.91834 14.9574 2.78718 15.0101C2.65601 15.0629 2.53663 15.1411 2.43597 15.2404C2.33531 15.3396 2.25537 15.4579 2.20082 15.5883C2.14626 15.7187 2.11816 15.8586 2.11816 16C2.11816 16.1414 2.14626 16.2813 2.20082 16.4117C2.25537 16.5421 2.33531 16.6604 2.43597 16.7596C2.53663 16.8589 2.65601 16.9371 2.78718 16.9898C2.91834 17.0425 3.05868 17.0687 3.20002 17.0667H28.8C28.9414 17.0687 29.0817 17.0425 29.2129 16.9898C29.344 16.9371 29.4634 16.8589 29.5641 16.7596C29.6647 16.6604 29.7447 16.5421 29.7992 16.4117C29.8538 16.2813 29.8819 16.1414 29.8819 16C29.8819 15.8586 29.8538 15.7187 29.7992 15.5883C29.7447 15.4579 29.6647 15.3396 29.5641 15.2404C29.4634 15.1411 29.344 15.0629 29.2129 15.0101C29.0817 14.9574 28.9414 14.9313 28.8 14.9333H3.20002ZM3.20002 22.4C3.05868 22.398 2.91834 22.4241 2.78718 22.4768C2.65601 22.5295 2.53663 22.6078 2.43597 22.707C2.33531 22.8063 2.25537 22.9245 2.20082 23.0549C2.14626 23.1853 2.11816 23.3253 2.11816 23.4667C2.11816 23.608 2.14626 23.748 2.20082 23.8784C2.25537 24.0088 2.33531 24.1271 2.43597 24.2263C2.53663 24.3255 2.65601 24.4038 2.78718 24.4565C2.91834 24.5092 3.05868 24.5353 3.20002 24.5333H28.8C28.9414 24.5353 29.0817 24.5092 29.2129 24.4565C29.344 24.4038 29.4634 24.3255 29.5641 24.2263C29.6647 24.1271 29.7447 24.0088 29.7992 23.8784C29.8538 23.748 29.8819 23.608 29.8819 23.4667C29.8819 23.3253 29.8538 23.1853 29.7992 23.0549C29.7447 22.9245 29.6647 22.8063 29.5641 22.707C29.4634 22.6078 29.344 22.5295 29.2129 22.4768C29.0817 22.4241 28.9414 22.398 28.8 22.4H3.20002Z" fill="white" />
                    </svg>
                </button>
            </div>
            <div className={isNavExpanded ? "ul-containerMobile-expanded" : "ul-containerMobile"}>
                {/* Using hooks to achieve underline on active page */}
                <ul>
                    <li><Link to="/" onClick={handleLinkClick} className={location.pathname === '/' ? 'activeM' : ''}>Home</Link></li>
                    
                    {protectedRoutes.map((route, index) => {
                        if (loggedIn) {
                            return (
                                <li key={index}>
                                    <Link to={route.link} onClick={handleLinkClick} className={location.pathname.startsWith(route.link) ? "activeM" : ""} >{route.name}</Link>
                                </li>
                            );
                        } else {
                            return null; // Exclude protected routes when not logged in
                        }  
                         })}
                    
                    {/* Conditional rendering of login or logout link */}
                    {loggedIn ? (<li> <Link className={location.pathname === "/logout" ? "active" : ""} onClick={handleLogout}>Log out</Link></li>) 
                    : 
                    (<li><Link to="/login" onClick={handleLinkClick} className={location.pathname === '/login' ? 'activeM' : ''}>Login</Link></li>)}
                </ul>
            </div>
        </div>
    )
}