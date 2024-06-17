import React, {useState} from "react";
import notificationManager from "../Alert/notificationManager";
import BasicPage from "../../Components/BasicPage/BasicPage";
import trade from "../../Assets/Images/trade.png";
import {Link, useNavigate} from "react-router-dom";
import {useAuthInterceptor} from "../../Authentication/axiosInstance";
import {setAccessToken, setUser} from "../../Storage/SecureLs";
import Validation from "./SignupValidation";
import "./Signup.css";




function Signup() {
    const navigate = useNavigate();
    const axiosInstance = useAuthInterceptor();

    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        isVerified: "No",
        hasTakenQuiz: false,
        level: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        try{
            const response = await axiosInstance.post('/user/register', values);
            const token = response.data.accessToken;
            const user = response.data.user;
            setUser(user);
            setAccessToken(token);

            notificationManager.getToken();

            console.log('Signup success');

            if (user.role === 'User') {
                if (user.hasTakenQuiz) {
                    navigate('/watchlist');
                } else {
                    navigate('/quiz');
                }
            } else {
                navigate('/admin/AdDashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
        }

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
                        <Link to="/login">
                            <div className="login-link" >Login</div>
                        </Link>
                    </div>
                </div>
            </div>
        </BasicPage>
    );
}

export default Signup;
