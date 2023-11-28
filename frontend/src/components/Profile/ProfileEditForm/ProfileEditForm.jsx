import "./ProfileEditForm.css"
import { TechnologyContext } from "../../../providers/TechnologyProvider";
import { useContext, useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useForm } from "react-hook-form";

// * ProfileForm component
export default function ProfileEditForm({ props, onCancel, onSubmit }) {
    // Get accessToken
    const { accessToken } = useContext(TechnologyContext);
    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // Initialize useFrom
    const {
        register,
        handleSubmit,
        // formState: { errors }, reset
    } = useForm();

    // Patch request to the players api endpoint, update player
    function UpdatePlayer(data) {

        // Construct the updatedData object
        const updatedData = {};

        // Check each field and include it in updatedData if it's updated by the user
        if (data.firstname !== props.firstname) {
            updatedData.firstname = data.firstname || "";
        }
        if (data.lastname !== props.lastname) {
            updatedData.lastname = data.lastname || "";
        }
        if (data.password && data.password !== props.password) {
            updatedData.password = data.password;
        }
        if (data.institute !== props.institute) {
            updatedData.institute = data.institute || "";
        }

        // Check if any fields are updated
        if (Object.keys(updatedData).length > 0) {
            axios
                .patch(`http://localhost:5005/api/players/${id}`, updatedData, {
                    headers: { authToken: `Bearer ${accessToken}` }
                })
                .then((res) => {
                    alert("Your profile has been updated!")
                    onSubmit();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("No fields are updated");
        }
    }

    // When clicking on 'cancel' it will close the form. Executed in the ProfileTable component.
    const handleCancelClick = () => {
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(UpdatePlayer)} className="form-profile">
            <label htmlFor="firstname" className="label-profile">First name</label>
            <input {...register("firstname")} type="text" id="firstname" name="firstname" className="input-profile"
                defaultValue={props.firstname} />

            <label htmlFor="lastname" className="label-profile">Last name</label>
            <input {...register("lastname")} type="text" id="lastname" name="lastname" className="input-profile"
                defaultValue={props.lastname} />

            <label htmlFor="password" className="label-profile">Password</label>
            <input {...register("password")} type="password" id="password" name="password" className="input-profile"
                defaultValue={props.password} />

            <label htmlFor="institute" className="label-profile">Institute</label>
            <select {...register("institute", { required: "Please choose your institute" })} type="text" name="institute" id="institute" className="input-profile"
                defaultValue={props.institute} >
                <option value=""></option>
                <option value="Design">Design</option>
                <option value="Helsevitenskap">Helsevitenskap</option>
                <option value="Informasjonssikkerhet og kommunikasjonsteknologi">Informasjonssikkerhet og kommunikasjonsteknologi</option>
                <option value="Vareproduksjon og byggteknikk">Vareproduksjon og byggteknikk</option>
            </select>

            <div className="button-container">
                <input type="submit" className="submit-profile" id="submit" value="Save changes" />
                <button onClick={handleCancelClick} className="cancelBtn-profile">Cancel</button>
            </div>
        </form>
    )
}