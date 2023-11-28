import React from "react";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TechnologyContext } from "../../providers/TechnologyProvider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// * LoginForm component
export default function LoginForm() {
    // Get and set loggedIn and accessToken from context
    const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(TechnologyContext);
    const [errorMessage, setErrorMessage] = useState("");

    // Initialize useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Initialize useNavigate
    const navigate = useNavigate();

    // Post data from form to login api endpoint
    function LoginPlayer(data) {
        // Initialize credentials
        const axiosConfig = axios.create({
            withCredentials: true
        })
        axiosConfig
            .post("http://localhost:5005/api/auth/login", data) // axios post
            .then((res) => {
                setLoggedIn(true); // After submitting set loggedIn to true
                setAccessToken(res.data.accessToken); // After sumbitting save accessToken
                navigate("/");
            })
            .catch((error) => {
                if (error.response && error.response.status) {
                    setErrorMessage("Invalid email or password!"); // Set the error message
                } else {
                    console.log(error);
                }
            });
        reset({ email: "", password: "" }); // Reset input fields
    }


    // Listen on the loggedIn state
    useEffect(() => {
    }, [loggedIn]);

    // Listen on the accessToken state
    useEffect(() => {
    }, [accessToken]);


    const handleClick = () => {
        setErrorMessage("");
    }

    useEffect(() => {
       handleClick()
    }, []);


    return (
        <div className="center">
            {/* React Hook Form */}
            <form onSubmit={handleSubmit(LoginPlayer)}>
                <div className="email-div">
                    <label className="label-login" htmlFor="email">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Please enter a valid email address",
                        })}
                        type="email"
                        name="email"
                        id="email"
                        className="input-login"
                        onClick={handleClick}
                    />
                    <p>{errors.email?.message}</p>
                </div>

                <div className="password-div">
                    <label className="label-login" htmlFor="password">
                        Password
                    </label>
                    <input
                        {...register("password", { required: "Please enter password" })}
                        type="password"
                        name="password"
                        id="password"
                        className="input-login"
                        onClick={handleClick}
                    />
                    <p>{errors.password?.message}</p>

                    {errorMessage && <p id="warning">{errorMessage}</p>}
                </div>

                <div className="submit-div">
                    <input
                        type="submit"
                        className="submit-login"
                        id="submit"
                        value="Login"
                    />
                </div>
            </form>

            <div className="subtitle">
                <Link className="subtitle" to="/newuser">
                    Not a user yet? Create account here
                </Link>
            </div>
        </div>
    );
}
