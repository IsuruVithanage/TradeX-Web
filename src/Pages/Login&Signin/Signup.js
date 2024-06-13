import React, {useState} from "react";
import notificationManager from "../Alert/notificationManager";
import "./Signup.css";
import BasicPage from "../../Components/BasicPage/BasicPage";
import trade from "../../Assets/Images/trade.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Validation from "./SignupValidation";
import {setAccessToken} from "../../Features/authSlice";
import { useDispatch } from 'react-redux';

function Signup() {
    const navigate = useNavigate();
    const [values, setvalues] = useState({
        userName: "",
        email: "",
        password: "",
        isVerified: "No",
        hasTakenQuiz: false,
        level: "",
    });
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setvalues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        console.log(values);

        if (values.userName === "" || values.email === "" || values.password === "") {
            console.log("Please fill all the fields");
            return;
        }

        axios
            .post(`${process.env.REACT_APP_API_GATEWAY}/user/register`, values)
            .then((res) => {
                const token = res.data.accessToken;
                const user = res.data.user;

                console.log('User', user);

                localStorage.setItem('user', JSON.stringify(user));
                dispatch(setAccessToken(token));
                console.log('Access token ', token);
                console.log('Login success');
                notificationManager.getToken();
                navigate("/quiz")
            })
            .catch((err) => console.log(err));
    };
    return (
        // Sign in box of the page
        <BasicPage
            sideNavBar={false}
            icon={<img src={trade} width="73px" alt="tradex"/>}
        >
            <div>
                <div className="topic">
                    <h1 className="welcome">WELCOME</h1>
                    <h1 className="traders">TRADERS</h1>
                </div>

                <div className="black-background">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="User Name"
                            name="userName"
                            className="username-input"
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <div className="text-danger-uname"> {errors.username}</div>
                        )}

                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            className="email-input"
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <div className="text-danger-email"> {errors.email}</div>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="confirm-password-input"
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <div className="text-danger-password"> {errors.password}</div>
                        )}

                        <div>
                            <button className="sign-button">Sign Up</button>
                        </div>
                    </form>

                    <div className="have-account">
                        <div className="have-text">Already have an account?</div>
                        <Link to="/">
                            <div className="login-link">Login</div>
                        </Link>
                    </div>
                </div>
            </div>
        </BasicPage>
    );
}

export default Signup;
