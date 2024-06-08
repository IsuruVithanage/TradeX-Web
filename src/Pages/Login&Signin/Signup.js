import React, {useState} from "react";
import "./Signup.css";
import BasicPage from "../../Components/BasicPage/BasicPage";
import trade from "../../Assets/Images/trade.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Validation from "./SignupValidation";

function Signup({firebase}) {
    const navigate = useNavigate();
    const [values, setvalues] = useState({
        userName: "",
        email: "",
        password: "",
        isVerified: "No",
        hasTakenQuiz: false,
        level: "",
    });

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
            .post("http://localhost:8004/user/register", values)
            .then((res) => {
                const token = res.data.token;
                const user = res.data.user;

                const userData = {
                    id: user.userId,
                    username: user.userName,
                    email: user.email,
                    isVerified: user.isVerified,
                    hasTakenQuiz: user.hasTakenQuiz,
                    level: user.level,
                };


                console.log("Token:", token);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem("access-token", token);
                console.log("Login success");
                firebase.getToken(user.userId);
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
