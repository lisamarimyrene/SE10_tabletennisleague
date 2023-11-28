import React, { useState } from "react";
import "./InfoMatch.css";
import axios from "axios";
import EditMatch from "../EditMatch/EditMatch";
import { useNavigate } from "react-router-dom";

// * InfoMatch component, which will render the info about the match on the MatchesCard.
export default function InfoMatch({ props, index, userRole, accessToken, setMatches, updateMatchData }) {
    // Set editMode state
    const [editMode, setEditMode] = useState(false);

    // Delete match if you click on delete button
    const handleDeleteClick = (index) => {

        // Confirm if you want to delete the match
        const confirms = confirm("Are you sure you want to delete this match?");
        
        // If user clicked confirm, then continue
        if (confirms) {
            axios
                .delete(`http://localhost:5005/api/matches/${props._id}`, {
                    headers: { authToken: `Bearer ${accessToken}` },
                })
                .then((res) => {
                    // Delete match and update state
                    setMatches(prevMatches => prevMatches.filter((item, idx) => idx !== index));
                })
                .catch((error) => console.log(error));
        }
    };

    // Handle edit modes
    const handleEditClick = () => {
        setEditMode(true);
    };

    // Handle onCancel
    const onCancel = () => {
        setEditMode(false);
    };

    // Handle onSubmit
    const onSubmit = (updatedMatch) => {
        setEditMode(false);
        updateMatchData(index, updatedMatch);
    };

    // Handle stats button
    const navigate = useNavigate();
    const handleStatsBtn = (matchId) => {
        navigate(`/matches/${matchId}`)
    }

    return (
        <div className="infomatch-container">
            {editMode ? (
                <EditMatch match={props} indx={index} onCancel={onCancel} onSubmit={onSubmit} updateMatchData={updateMatchData}/>
            ) : (
                <>
                    <div className="infomatch-text">
                        <div className="infomatch-stats">
                            <h4>Date</h4>
                            <p>
                                {new Date(props.date).toLocaleDateString("nb-NO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                })}
                            </p>
                        </div>
                        <div className="infomatch-stats">
                            <h4>Result</h4>
                            <p>{props.overallPoints}</p>
                        </div>
                    </div>


                    <div className="winner-container">
                        <h4>Winner</h4>
                        <h3>
                            {(props.winner && props.winner.firstname) || "Anonymous"}{" "}
                            {(props.winner && props.winner.lastname) || ""}
                        </h3>
                    </div>

                    {userRole === "admin" && !editMode && (
                        <div className="infomatch-buttons">
                            <button className="matchesStatsBtn" onClick={() => handleStatsBtn(props._id)}>Statitics</button>
                            {!editMode && (
                                <button className="matchesEditBtn" onClick={handleEditClick}>
                                    Edit
                                </button>
                            )}
                            <button className="matchesDeleteBtn" onClick={() => handleDeleteClick(index)}>
                                Delete
                            </button>
                        </div>
                    )}
                    {userRole === "user" && (
                        <button className="matchesStatsBtn" onClick={() => handleStatsBtn(props._id)}>Statitics</button>
                    )}
                </>
            )}
        </div>
    )
} 