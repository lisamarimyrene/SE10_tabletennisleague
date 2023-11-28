import "./TableTennisWebComponent.css";
import "./scoreboardCounter.js"
import React, { useEffect, useContext, useState, useRef } from 'react';
import { TechnologyContext } from "../../providers/TechnologyProvider";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ScoreBoard } from "./scoreboardCounter.js";

// * TableTennisWebComponent component
export default function TableTennisWebComponent({ handleFinishMatch }) {
    // Get the loggedIn and accessToken state
    const { loggedIn, accessToken } = useContext(TechnologyContext);
    // Set state
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [idPlayer1, setIdPlayer1] = useState(null);
    const [idPlayer2, setIdPlayer2] = useState(null);
    const [finishedLoading, setFinishedLoading] = useState(false)
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState()
    
    // Get the match Id from the URL
    const { id } = useParams();
    console.log("Match id:", id);

    // Listen on startTime
    useEffect(() => {
        if (startTime)
            return
        setStartTime(new Date())
    }, [])

    // Calculate duration
    const getDuration = (start, end) => {
        const duration = end - start

        // Convert milliseconds to human-readable format
        const durationInSeconds = Math.floor(duration / 1000);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        return `${minutes}:${seconds}`
    }


    // * Fetch players data from the created match
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get(`http://localhost:5005/api/matches/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                // Set players name and players id
                setPlayer1(res.data[0].players.player1.firstname);
                setPlayer2(res.data[0].players.player2.firstname);
                setIdPlayer1(res.data[0].players.player1._id);
                // console.log(res.data[0].players.player1._id);
                setIdPlayer2(res.data[0].players.player2._id);
                // Dont render before its finished loading
                setFinishedLoading(true)
            })
            .catch((error) => {
                setFinishedLoading(true)
                console.log(error)
            });
    }, [loggedIn, accessToken]);


    // Initialize new ref
    const scoreBoardRef = useRef(null);

    // Helper function to handle the showResults event
    const handleShowResults = (e) => {
        console.log('custom event listened to', e);
        if (!loggedIn) {
            return;
        }

        // Set endTime
        const endTime = new Date();

        // Set timestamps
        const timestamps = {
            startTime: startTime,
            endTime: endTime,
        };

        // Get the details from the finished match
        const { detail: { dateAndTime, player1_name, player2_name, player_score, player_winner } } = e;

        // Set the players based on id
        const players = {
            player1: idPlayer1,
            player2: idPlayer2,
        };

        // Set the sets results from the match
        const setResults = player_score;
        console.log("OVERALL SCORE", setResults);

        // Set the final results from the match.
        let player1Sets = 0;
        let player2Sets = 0;

        // For each set result, increment the overall score.
        setResults.forEach((set) => {
            const [player1Score, player2Score] = set[0].split(' - ');
            if (parseInt(player1Score) > parseInt(player2Score)) {
                player1Sets++;
            } else {
                player2Sets++;
            }
        });

        console.log("PLAYER1 SETS", player1Sets);
        console.log("PLAYER2 SETS", player2Sets);

        // Calculate the overall points
        const overallPoints = `${player1Sets}-${player2Sets}`;

        // Extract the winner's name from player_winner
        const winnerName = player_winner;
        console.log();

        // Set the winning player, and then get the winning player's id
        let winner;
        if (winnerName === player1_name) {
            winner = idPlayer1;
        }
        if (winnerName === player2_name) {
            winner = idPlayer2;
        }

        // Make the API call to update the match
        updateMatch({
            players: players,
            timestamps: timestamps,
            duration: getDuration(startTime, endTime),
            player1Sets: player1Sets,
            player2Sets: player2Sets,
            setResults: setResults,
            overallPoints: overallPoints,
            winner: winner,
            finished: true,
        });

        setGameOver(true);
    };

    // Helper function to update the match
    const updateMatch = (data) => {
        axios
            .put(`http://localhost:5005/api/matches/${id}`, data, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Helper function to set attributes to the web components
    const setScoreboardAttributes = (scoreboard) => {
        scoreboard.setAttribute("showplayers", "true");
        scoreboard.setAttribute("showsets", "true");
        scoreboard.setAttribute("showprevioussets", "true");
        scoreboard.setAttribute("player1_name", player1);
        scoreboard.setAttribute("player2_name", player2);
    };

    // useEffect to handle the rendering and event listener
    useEffect(() => {
        if (!scoreBoardRef.current) {
            return;
        }

        const scoreboard = new ScoreBoard();

        scoreBoardRef.current.addEventListener('showResults', handleShowResults);
        setScoreboardAttributes(scoreboard);
        scoreBoardRef.current.appendChild(scoreboard);

        return () => {
            if (scoreBoardRef.current) {
                scoreBoardRef.current.removeEventListener('showResults', handleShowResults);
                scoreBoardRef.current.removeChild(scoreboard);
            }
        };
    }, [finishedLoading, scoreBoardRef]);


    return (
        <div className="tabletennis-container">
            <h1>Let's play!</h1>
            <section className="scoreboard-container">
                <div ref={scoreBoardRef}></div>
            </section>
            {gameOver && (
                <button className="finishMatchBtn" onClick={handleFinishMatch}>Finish match</button>
            )}
        </div>
    );
}
