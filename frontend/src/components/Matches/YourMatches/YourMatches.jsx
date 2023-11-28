import axios from "axios"
import React, { useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { TechnologyContext } from "../../../providers/TechnologyProvider";
import { useNavigate } from "react-router-dom";

export default function YourMatches() {

    // Get the loggedIn and accessToken state
    const { loggedIn, accessToken, userRole } = useContext(TechnologyContext);
    // Get the logged in players data
    const [loggedInPlayer, setLoggedInPlayer] = useState([])
    // Get all matches
    const [matches, setMatches] = useState([])

    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // * Get all matches
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get("http://localhost:5005/api/matches", {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                const filteredMatches = res.data.filter((match) =>
                    match.players.player1?._id === id || match.players.player2?._id === id
                );
                setMatches(filteredMatches);
            })
            .catch((error) => console.log(error));
    }, [loggedIn, accessToken, id]);

    // If you are not logged in, return null.
    if (!loggedIn) {
        return null;
    }

    const navigate = useNavigate(); // Use the useNavigate hook here

    // Handle stats button
    const handleStatsBtn = (matchId) => {
        navigate(`/matches/${matchId}`)
    }


    return (
        <>
            {/* Map over matches and find data */}
            {matches &&
                matches.map((match, index) => (
                    <div key={index} className="matchescard-container">
                        <h2>MATCH</h2>
                        <div className="matchplayers-container">
                            <h3>
                                {(match.players?.player1 && match.players.player1.firstname) || "Anonymous"}{" "}
                                {(match.players?.player1 && match.players.player1.lastname) || ""}
                            </h3>
                            <span>VS</span>
                            <h3>
                                {(match.players?.player2 && match.players.player2.firstname) || "Anonymous"}{" "}
                                {(match.players?.player2 && match.players.player2.lastname) || ""}
                            </h3>
                        </div>


                        <div className="infomatch-text">
                            <div className="infomatch-stats">
                                <h4>Date</h4>
                                <p>
                                    {new Date(match.date).toLocaleDateString("nb-NO", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div className="infomatch-stats">
                                <h4>Result</h4>
                                <p>{match.overallPoints}</p>
                            </div>
                        </div>


                        <div className="winner-container">
                            <h4>Winner</h4>
                            <h3>
                                {(match.winner && match.winner.firstname) || "Anonymous"}{" "}
                                {(match.winner && match.winner.lastname) || ""}
                            </h3>
                        </div>
                        <button className="matchesStatsBtn" onClick={() => handleStatsBtn(match._id)}>Statitics</button>

                    </div>
                ))
            }
        </>
    );
}
