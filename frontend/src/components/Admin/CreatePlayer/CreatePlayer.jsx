import React from "react";
import "./CreatePlayer.css";
import { useForm } from "react-hook-form";
import axios from "axios";;

// * CreatePlayer component
export default function CreatePlayer({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    // Post request to the players api endpoint
    function RegisterPlayer(data) {
        axios
            .post("http://localhost:5005/api/players", data)
            .then((res) => {
                console.log(res.data);
                alert("Player has beed created!");
                onSubmit();
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert("Player creation failed: Username or email in use.");
                }
            });

        // Reset inputs when submitted
        reset({
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            institute: "",
        });
    }

    return (
        <div className="addPlayer-container">
            <div className="center">
                <form onSubmit={handleSubmit(RegisterPlayer)}>
                    <div className="firstname-div">

                        <label htmlFor="firstname" className="label-addplayer">
                            Firstname
                        </label>
                        <input
                            {...register("firstname", {
                                required: "Please enter your firstname",
                            })}
                            type="text"
                            name="firstname"
                            id="firstname"
                            className="input-addplayer"
                        />
                        <p>{errors.firstname?.message}</p>
                    </div>

                    <div className="lastname-div">
                        <label htmlFor="lastname" className="label-addplayer">
                            Lastname
                        </label>
                        <input
                            {...register("lastname", {
                                required: "Please enter your lastname ",
                            })}
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="input-addplayer"
                        />
                        <p>{errors.lastname?.message}</p>
                    </div>

                    <div className="username-div">
                        <label htmlFor="username" className="label-addplayer">
                            Username
                        </label>
                        <input
                            {...register("username", {
                                required: "Please enter your username",
                            })}
                            type="text"
                            name="username"
                            id="username"
                            className="input-addplayer"
                        />
                        <p>{errors.username?.message}</p>
                    </div>

                    <div className="email-div">
                        <label htmlFor="email" className="label-addplayer">
                            Email
                        </label>
                        <input
                            {...register("email", { required: "Please enter your email" })}
                            type="email"
                            name="email"
                            id="email"
                            className="input-addplayer"
                        />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div className="password-div">
                        <label htmlFor="password" className="label-addplayer">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Please enter your password",
                            })}
                            type="password"
                            name="password"
                            id="password"
                            className="input-addplayer"
                        />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div className="institute-div">
                        <label htmlFor="institute" className="label-addplayer">
                            Institute
                        </label>
                        <select
                            {...register("institute", {
                                required: "Please choose your institute",
                            })}
                            type="text"
                            name="institute"
                            id="institute"
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

                    <div className="submit-div">
                        <input
                            type="submit"
                            className="submit-addplayer"
                            id="submit"
                            value="Add player"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
