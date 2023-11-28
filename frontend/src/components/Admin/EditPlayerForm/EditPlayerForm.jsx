import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./EditPlayerForm.css";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { TechnologyContext } from "../../../providers/TechnologyProvider";

// * EditPlayerForm compontent
export default function EditPlayerForm() {
    // Get the loggedIn and accessToken
    const { loggedIn, accessToken } = useContext(TechnologyContext);
    // Set the selected player
    const [player, setPlayer] = useState([]);

    // Initialize react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Get the selected players id
    const { id } = useParams();

    const navigate = useNavigate();

    // Get the logged in player
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get(`http://localhost:5005/api/players/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            }) // Set header to Bearer to get access approved by the auth.
            .then((res) => {
                setPlayer(res.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [loggedIn, accessToken]);


    // Patch request to the players api endpoint, update a player
    async function UpdateChanges(data) {
        // Construct the updatedData object
        const updatedData = {
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            password: data.password || "",
            institute: data.institute || "",
            email: data.email || "",
        };

        // Check each field and include it in updatedData if it's updated by the user
        if (data.firstname !== player.firstname) {
            updatedData.firstname = data.firstname || "";
        }
        if (data.lastname !== player.lastname) {
            updatedData.lastname = data.lastname || "";
        }
        if (data.password && data.password !== player.password) {
            updatedData.password = data.password;
        }
        if (data.institute !== player.institute) {
            updatedData.institute = data.institute || "";
        }

        // Check if any fields are updated
        if (Object.keys(updatedData).length > 0) {
            try {
                // Update players
                await axios.patch(
                    `http://localhost:5005/api/players/${id}`,
                    updatedData,
                    {
                        headers: { authToken: `Bearer ${accessToken}` },
                    }
                );
                // Send email request to the server-side component
                await axios.post("http://localhost:5005/api/auth/sendEmail", {
                    email: player.email,
                    newPassword: data.password,
                });
                alert("The player has been updated!");
                navigate("/Players/leaderboard"); // Redirect to the players page
            
            } catch (error) {
                console.log(error);
            }
        } else {
            // If no fields were updated
            console.log("No fields are updated");
        }
    }

    // Cancel functionality
    const handleCancelBtn = () => {
        navigate("/Players/leaderboard")
    }

    return (
        <div className="editplayer-container">
            <form onSubmit={handleSubmit(UpdateChanges)}>
                <div className="firstname-div">
                    <label htmlFor="firstname" className="label-editplayer">
                        Firstname
                    </label>
                    <input
                        {...register("firstname")}
                        type="text"
                        name="firstname"
                        id="firstname"
                        defaultValue={player.firstname}
                        className="input-editplayer"
                    />
                    <p>{errors.firstname?.message}</p>
                </div>

                <div className="lastname-div">
                    <label htmlFor="lastname" className="label-editplayer">
                        Lastname
                    </label>
                    <input
                        {...register("lastname")}
                        type="text"
                        name="lastname"
                        id="lastname"
                        defaultValue={player.lastname}
                        className="input-editplayer"
                    />
                    <p>{errors.lastname?.message}</p>
                </div>

                <div className="username-div">
                    <label htmlFor="username" className="label-editplayer">
                        Username
                    </label>
                    <input
                        {...register("username")}
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={player.username}
                        className="input-editplayer"
                    />
                    <p>{errors.username?.message}</p>
                </div>

                <div className="password-div">
                    <label htmlFor="password" className="label-editplayer">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="password"
                        defaultValue={player.password}
                        className="input-editplayer"
                    />
                    <p>{errors.password?.message}</p>
                </div>

                <div className="institute-div">
                    <label htmlFor="institute" className="label-editplayer">
                        Institute
                    </label>
                    <select
                        {...register("institute")}
                        type="text"
                        name="institute"
                        id="institute"
                        className="input-editplayer"
                        defaultValue={player.institute}
                    >
                        <option value=""></option>
                        <option value="Design">Design</option>
                        <option value="Helsevitenskap">Helsevitenskap</option>
                        <option value="Informasjonssikkerhet og kommunikasjonsteknologi">
                            Informasjonssikkerhet og kommunikasjonsteknologi
                        </option>
                        <option value="Vareproduksjon og byggteknikk">
                            Vareproduksjon og byggteknikk
                        </option>
                    </select>
                    <p>{errors.institute?.message}</p>
                </div>

                <div className="editplayer-submit-div">
                    <input
                        type="submit"
                        className="editplayer-submit"
                        id="submit"
                        value="Update player"
                    />
                    <button className="editplayer-cancelBtn" onClick={handleCancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
