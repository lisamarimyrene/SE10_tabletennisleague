import "./NewMatchCard.css"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { TechnologyContext } from "../../../providers/TechnologyProvider";
import { Link, useNavigate } from "react-router-dom";

export default function NewMatchCard() {

    // Get the loggedIn and accessToken state
    const { loggedIn, accessToken, userRole } = useContext(TechnologyContext);
    // Get the logged in players data
    const [loggedInPlayer, setLoggedInPlayer] = useState([])
    // Get the players state
    const [players, setPlayers] = useState([])
    // Selected players' id
    const [selectedPlayerId, setSelectedPlayerId] = useState("");

    //Selected player's id (if logged in as admin)
    const [selectedPlayerId2, setSelectedPlayerId2] = useState("");
    // Match id
    const [matchId, setMatchId] = useState(0)

    //Error message
    const [errorMessage, setErrorMessage] = useState("");

    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // * Get the logged in player id info from players api endpoint
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get(`http://localhost:5005/api/players/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                setLoggedInPlayer(res.data);
            })
            .catch((error) => console.log(error));
    }, [loggedIn, id, accessToken]);

    // * Get players info from players api endpoint
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get("http://localhost:5005/api/players", {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                setPlayers(res.data);
            })
            .catch((error) => console.log(error));
    }, [loggedIn, accessToken]);

    // If you are not logged in, return null.
    if (!loggedIn || !loggedInPlayer) {
        return null;
    }

    // Exclude the logged in player from the select player dropdown.
    const excludeLoggedInPlayer = (player) => {
        // Compare the player's ID with the logged-in user's ID
        return player._id !== (loggedInPlayer[0] && loggedInPlayer[0]._id);
    };

    // Listen on the selected player (event)
    const handlePlayerSelect = (e) => {
        setSelectedPlayerId(e.target.value);
        checkSelectedPlayers(selectedPlayerId2, e.target.value);
        console.log(e.target.value);
    };

    const handlePlayer2Select = (e) => {
        setSelectedPlayerId2(e.target.value);
        checkSelectedPlayers(e.target.value, selectedPlayerId);
        console.log(e.target.value);
    };

    const checkSelectedPlayers = (player1, player2) => {
        if (player1 && player2 && player1 === player2) {
            setErrorMessage("Please select 2 different players");
        } else {
            setErrorMessage("");
        }
    };



    const navigate = useNavigate(); // Use the useNavigate hook here

    // useEffect to navigate to the match page when matchId is set
    useEffect(() => {
        if (matchId) {
            navigate(`/matches/${matchId}`);
        }
    }, [matchId, navigate]);


    // Get createMatch route and handle it.
    const handleStartMatch = () => {

        let player1;
        let player2 = selectedPlayerId;

        //Change value of "player1" based on whether you are logged in with "user" or "admin".
        if (userRole === "user") {
            player1 = id;
        } else if (userRole === "admin") {
            player1 = selectedPlayerId2;
        } else {
            return;
        }

        //If player1 and player2 is the same, show error message
        if (player1 === player2) {
            setErrorMessage("Please select 2 different players");
            return;

            //if player2 or player1 is missing, show error message
        } else if (!player2 || !player1) {
            setErrorMessage("Please select another player");
            return;

            //if there is no player1 and no player2, show error message
        } else if (!player2 && !player1) {
            setErrorMessage("Please select 2 different players");
            return;
        }

        setErrorMessage("");
        // Create a new match
        axios
            .post(
                "http://localhost:5005/api/matches/matchId",
                {

                    player1: player1, // The logged in players' id
                    player2: player2, // The selected player's ID

                },
                {
                    headers: { authToken: `Bearer ${accessToken}` },
                }
            ).then((res) => {
                console.log(res.data);
                setMatchId(res.data._id);
                // console.log(matchId);
                // navigate(`/matches/${res.data._id}`);// Navigate to the specified URL
            }).catch((error) => console.log(error));
    };

    return (
        <div className="newMatchCard-container">
            <h2>Select players</h2>
            <div className="newMatchPlayers-container">
                {userRole === "user" && (
                    <h3>
                        {loggedInPlayer[0]?.firstname} {loggedInPlayer[0]?.lastname}
                    </h3>)}

                {userRole === "admin" && (

                    <select id="players" name="players" onChange={handlePlayer2Select}>
                        <option>Select player...</option>
                        {players

                            .map((player) => (
                                <option key={player._id} value={player._id}>
                                    {player.firstname} {player.lastname}
                                </option>
                            ))}
                    </select>

                )}


                <span>VS</span>
                <select id="players" name="players" onChange={handlePlayerSelect}>
                    <option>Select player...</option>
                    {players
                        .filter(excludeLoggedInPlayer)
                        .map((player) => (
                            <option key={player._id} value={player._id}>
                                {player.firstname} {player.lastname}
                            </option>
                        ))}
                </select>
                <button className="startMatchBtn" onClick={handleStartMatch}>
                    Start match
                </button>

                {errorMessage && <p id="warning">{errorMessage}</p>}
            </div>
        </div>
    )
}