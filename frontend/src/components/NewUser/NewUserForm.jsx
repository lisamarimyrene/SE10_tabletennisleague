import React from "react";
import "./NewUserForm.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";


// * NewUserForm component
export default function NewUserForm() {
    // Initialize useFrom
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    // Post request to the players api endpoint
    async function RegisterPlayer(data) {
        try {
            const response = await axios.post(
                "http://localhost:5005/api/players",
                data
            );
            console.log(response.data);

            const { firstname, email, username, password } = response.data;

            // Send email to the registered player
            await axios.post("http://localhost:5005/confEmail", {
                email,
                firstname,
                username,
                password,
            });

            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("User creation failed: Username or email in use.");
               
            }
        }

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


    // React Hook Form
    return (
        <div className="newUserForm-container">
            <div className="center">
                <form onSubmit={handleSubmit(RegisterPlayer)}>
                    <div className="firstname-div">
                   
                        <label htmlFor="firstname" className="label-newuser">
                            Firstname
                        </label>
                        <input
                            {...register("firstname", {
                                required: "Please enter your firstname",
                            })}
                            type="text"
                            name="firstname"
                            id="firstname"
                            className="input-newuser"
                        />
                        <p>{errors.firstname?.message}</p>
                    </div>

                    <div className="lastname-div">
                        <label htmlFor="lastname" className="label-newuser">
                            Lastname
                        </label>
                        <input
                            {...register("lastname", {
                                required: "Please enter your lastname ",
                            })}
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="input-newuser"
                        />
                        <p>{errors.lastname?.message}</p>
                    </div>

                    <div className="username-div">
                        <label htmlFor="username" className="label-newuser">
                            Username
                        </label>
                        <input
                            {...register("username", {
                                required: "Please enter your username",
                            })}
                            type="text"
                            name="username"
                            id="username"
                            className="input-newuser"
                        />
                        <p>{errors.username?.message}</p>
                    </div>

                    <div className="email-div">
                        <label htmlFor="email" className="label-newuser">
                            Email
                        </label>
                        <input
                            {...register("email", { required: "Please enter your email" })}
                            type="email"
                            name="email"
                            id="email"
                            className="input-newuser"
                        />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div className="password-div">
                        <label htmlFor="password" className="label-newuser">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Please enter your password",
                            })}
                            type="password"
                            name="password"
                            id="password"
                            className="input-newuser"
                        />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div className="institute-div">
                        <label htmlFor="institute" className="label-newuser">
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
                            className="submit-newuser"
                            id="submit"
                            value="Create account"
                        />
                    </div>
                </form>
            </div>
            <div className="subtitle-div">
                <Link className="subtitle" to="/login">
                    Already a user? Click here to login
                </Link>
            </div>
        </div>
    );
}
