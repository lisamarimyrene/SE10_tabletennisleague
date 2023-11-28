import React, { useContext } from "react";
import { TechnologyContext } from "../../../../providers/TechnologyProvider";
import axios from 'axios';
import { useForm } from "react-hook-form";
import "./EditMatch.css"

// * EditMatch component which will render the edit-form of the MatchesCard
export default function EditMatch({ match, indx, onCancel, onSubmit, updateMatchData }) {

    // Get loggedIn accessToken, and player states.
    const { accessToken } = useContext(TechnologyContext)

    // Initialize new react hook form
    const { register, handleSubmit } = useForm();

    // Set player 1 and player 2
    let player1 = match.players?.player1?._id;
    let player2 = match.players?.player2?._id;

    // Post request to the players api endpoint
    function UpdateMatch(data) {
        const { player1Sets, player2Sets } = data;
        const updatedData = {
            ...data,
            players: {
                player1: player1 || null, // Set to null if player1 is null
                player2: player2 || null, // Set to null if player2 is null
            },
            player1Sets: parseInt(data.player1Sets),
            player2Sets: parseInt(data.player2Sets),
            overallPoints: `${data.player1Sets}-${data.player2Sets}` // Include the players object in the data
        };

        axios.patch(`http://localhost:5005/api/matches/${match._id}`, updatedData, {
            headers: { authToken: `Bearer ${accessToken}` }
        }) // Set header to Bearer to get access approved by the auth.
            .then((res) => {
                alert("The match has been updated!")
                // Update the match object
                const updatedMatch = { ...match, ...res.data };
                onSubmit(updatedMatch);
                updateMatchData(indx, updatedMatch);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // When clicking on the 'cancel button' it will close the form.
    const handleCancelClick = () => {
        onCancel();
    };

    // const handleSubmitClick = () => {
    //     onSubmit();
    // };

    return (
        <form onSubmit={handleSubmit(UpdateMatch)} className="form-editmatch">

            <div className="input-container">
                <div className="input-player1-container">
                    <label htmlFor="player1Sets" className="label-editmatch">{match.players?.player1?.firstname || "Anonymous"}'s score</label>
                    <input {...register("player1Sets")} type="number" id="player1Sets" name="player1Sets" defaultValue={match.player1Sets} className="input-editmatch" />
                </div>

                <div className="input-player2-container">
                    <label htmlFor="player2Sets" className="label-editmatch">{match.players?.player2?.firstname || "Anonymous"}'s score</label>
                    <input {...register("player2Sets")} type="number" id="player2Sets" name="player2Sets" defaultValue={match.player2Sets} className="input-editmatch" />
                </div>
            </div>

            <div className="editmatch-button-container">
                <input type="submit" className="submit-editmatch" id="submit" value="Save" />
                <button onClick={handleCancelClick} className="cancel-editmatch">Cancel</button>
            </div>
        </form>
    )
} 