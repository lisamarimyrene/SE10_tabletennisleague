import React, { useContext, useEffect, useState } from "react";
import "./MatchesCard.css";
import axios from "axios";
import { TechnologyContext } from "../../../providers/TechnologyProvider";
import InfoMatch from "./InfoMatch/InfoMatch";

// * MatchesCard component
export default function MatchesCard() {
    // Get the loggedIn and accessToken state
    const { loggedIn, accessToken, userRole } = useContext(TechnologyContext);
    // Get the matches state
    const [matches, setMatches] = useState([]);

    // Get matches info from matches api endpoint
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get("http://localhost:5005/api/matches", {
                headers: { authToken: `Bearer ${accessToken}` },
            }) // Set header to Bearer to get access approved by the auth.
            .then((res) => {
                // Only show matches that are finished
                setMatches(res.data.filter(match => match.finished));
            })
            .catch((error) => console.log(error));
    }, [loggedIn]);


    // console.log(matches);
    if (!loggedIn) {
        return null;
    }

    // Callback function to update match data in InfoMatch component
    const updateMatchData = (index, updatedMatch) => {
        console.log("Updated Match:", updatedMatch);
        setMatches((prevMatches) => {
            const updatedMatches = [...prevMatches];
            updatedMatches[index] = updatedMatch;
            return updatedMatches;
        });
    };

    return (
        <>
            {/* Map over matches and find data */}
            {matches &&
                matches.map((match, index) => (
                    <div key={index} className="matchescard-container">
                        <h2>MATCH</h2>
                        <div className="matchplayers-container">
                            <h3>
                                {(match.players?.player1?.firstname) || "Anonymous"}{" "}
                                {(match.players?.player1?.lastname) || ""}
                            </h3>
                            <span>VS</span>
                            <h3>
                                {(match.players?.player2?.firstname) || "Anonymous"}{" "}
                                {(match.players?.player2?.lastname) || ""}
                            </h3>
                        </div>
                        <InfoMatch props={match} userRole={userRole} index={index} accessToken={accessToken} setMatches={setMatches} updateMatchData={updateMatchData} />
                    </div>
                ))}
        </>
    );
}
