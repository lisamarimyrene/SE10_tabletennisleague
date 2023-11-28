// Import modules
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { TechnologyContext } from "../../../providers/TechnologyProvider";

// Import CSS and components
import "./ProfileTable.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileEditForm from "../ProfileEditForm/ProfileEditForm";

// * ProfileTable component
export default function ProfileTable() {

    // Get loggedIn accessToken, and player states.
    const { loggedIn, accessToken } = useContext(TechnologyContext);
    const [player, setPlayer] = useState([])
    const [toggle, setToggle] = useState(false)
    // console.log(loggedIn);

    // Handle the toggle form function
    const handleToggleClick = () => {
        setToggle(!toggle);
    };

    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // Get user id from the logged in user
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios.get(`http://localhost:5005/api/players/${id}`,
            { headers: { authToken: `Bearer ${accessToken}` } }) // Set header to Bearer to get access approved by the auth.))
            .then(res => {
                setPlayer(res.data[0])
            })
            .catch(error => console.log(error))
    }, [loggedIn])

    if (!loggedIn) {
      return;
    }

    // Toggle close form if user press cancel.
    const handleCancelEdit = () => {
        setToggle(false);
    };

    // Toggle close form if user press submit.
    const handleSubmitEdit = () => {
        setToggle(false);

        // Retrieve the updated player data from the server
        axios
            .get(`http://localhost:5005/api/players/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                setPlayer(res.data[0]); // Update the player state with the new data
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="profiletable-container">
            <div className="profile-table">

                <div className="profile-info box1">
                    <div className="box1-image">
                        <p>&#127955;</p>
                    </div>
                    <div className="box1-text">
                        <h2>{player.firstname} {player.lastname}</h2>
                        <p>Institute of {player.institute}</p>
                    </div>
                </div>

                <div className="profile-info box2">
                    <div className="box2-info">
                        <h2>Personal Information</h2>
                        <button className="editBtn" onClick={handleToggleClick}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg><p>Edit</p></button>
                    </div>

                    {toggle ? <ProfileEditForm props={player} onSubmit={handleSubmitEdit} onCancel={handleCancelEdit} /> : <ProfileInfo props={player} />}

                </div>

                <div className="profile-info box3">
                    <h2>Stats</h2>
                    <div className="box3-div">
                        <div>
                            <h3>Current points</h3>
                            <p>{player.points}</p>
                        </div>
                        <div>
                            <h3>Matches won</h3>
                            <p>{player.matchesWon}</p>
                        </div>

                    </div>
                </div>
             </div> 
        </div>
  );
}
