// Modules
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";

// Components
import NavbarMobile from "./components/NavbarMobile/NavbarMobile";
import NavbarDesktop from "./components/NavbarDesktop/NavbarDesktop";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Homepage/Homepage";
import Players from "./pages/Players/Players";
import AllPlayers from "./pages/Players/AllPlayers";
import FavoritePlayers from "./pages/Players/FavoritePlayers";
import EditPlayer from "./pages/Players/EditPlayer"
import Matches from "./pages/Matches/Matches";
import Match from "./pages/Matches/Match";
import Profile from "./pages/Profile/Profile";
import ProfileInfo from "./pages/Profile/ProfileInfo";
import ProfileOldMatches from "./pages/Profile/ProfileOldMatches";
import Login from "./pages/Login/Login";
import NewUser from "./pages/NewUser/NewUser";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// * Function App
export default function App() {
    // Set navbar
    const activePageRef = useRef(window.location.pathname);
    const [isMobile, setIsMobile] = useState(false);

    // UseEffect to the navbars, switch based on screen size.
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 575); // set the breakpoint for mobile devices
        };

        setIsMobile(false);
        handleResize();
        window.addEventListener("resize", handleResize, false);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const activePage = activePageRef.current; // Access the current value of the ref

    //React router dom v6
    return (
        <div className="App">
            {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoutes />}>
                    {" "}
                    {/* Some paths is wrapped with protected routes */}
                    <Route path="/players/" element={<Players />}>
                        <Route path="/players/leaderboard" element={<AllPlayers />} />
                        <Route path="/players/favorites" element={<FavoritePlayers />} />
                        <Route path="/players/editPlayer/:id" element={<EditPlayer />} />
                    </Route>
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/matches/:id" element={<Match />} />

                    <Route path="/profile/" element={<Profile />}>
                        <Route path="/profile/ProfileInfo" element={<ProfileInfo />} />
                        <Route path="/profile/ProfileOldMatches" element={<ProfileOldMatches />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}
