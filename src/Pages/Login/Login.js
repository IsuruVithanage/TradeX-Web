import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../../Storage/SecureLs";
import { showMessage } from "../../Components/Message/Message";
import notificationManager from "../Alert/notificationManager";
import Input from "../../Components/Input/Input";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Validation from "./Validation";
import axios from "axios";
import "./Login.css";


function Login() {
    const baseurl = process.env.REACT_APP_API_GATEWAY;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();
    const [action, setAction] = useState('Login');
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({});


    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value.trim() });
        setErrorMessage('');
    };


    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            switch (e.target.id){
                case 'username': document.getElementById('email').focus();    break;
                case 'email':    document.getElementById('password').focus(); break;
                case 'password': document.getElementById('submit').click();   break;
                default : break;
            }
        }
    }


    const handleResponse = async (res) => {
        const token = res.data.accessToken;
        const user = res.data.user;
        setUser(user);
        setAccessToken(token);
        console.log('User:', user);

        await notificationManager.getToken();
        setIsLoading(false);

        if (user.role === 'User' ||
            user.role === 'PendingTrader' ||
            (user.role === 'Trader' && user.hasTakenQuiz)
        ) {
            navigate('/watchlist');
        } else if (user.role === 'Admin') {
            navigate('/admin/AdDashboard');
        } else if (user.role === 'Trader' && !user.hasTakenQuiz) {
            navigate('/quiz');
        }
    }


    const handleError = (error) => {
        setIsLoading(false);
        console.log('Login error:', error);

        !error.response ?
            showMessage('error', action + " Failed, Please try again.") :
            error.response.status === 502 ?
                showMessage('error', action + " Failed, Please try again.") :
                showMessage('error', error.response.data.message);
    }


    const handleSubmit = async () => {
        const error = Validation(values);
        setErrorMessage(error);

        if (!error) {
            setIsLoading(true);
            const endPoint = action === "Login" ? '/admin/login' : '/user/register';

            await axios.post(baseurl.concat(endPoint), values)
                .then((res) => handleResponse(res))
                .catch((error) => {
                    if(action === "Login" && (error.response && error.response.status === 404)){
                        axios.post(baseurl + '/user/login', values)
                            .then((res) => handleResponse(res))
                            .catch((error) => handleError(error));
                    }
                    else{
                        handleError(error);
                    }
                });
        }
    };


    useEffect(() => {
        if(action === "Login"){
            setValues({email: "", password: ""});
        }

        if(action === "SignUp"){
            setValues({username: "", email: "", password: ""});
        }
        setErrorMessage('');
    }, [action]);



    return (
        <BasicPage sideNavBar={false} topNavBar={false} isLoading={isLoading}>
            <div className="login-page-main-container">
                <div className="login-page-header-container">
                    <h1 className="login-page-header">WELCOME <span>TRADERS</span></h1>
                </div>

                <div className="login-page-form-container">
                    <h1 className="login-form-title">{action}</h1>
                    <div className="login-form-input-container">
                        <div className="login-form-hidden-input">
                            <Input
                                type="email"
                                placeholder="Username"
                                className="login-username-input"
                                value={values.username || ""}
                                name="username"
                                id="username"
                                autoComplete="off"
                                underline
                                style={{ display: action === 'SignUp' ? 'block' : 'none' }}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className={`login-form-traveling-input-container ${action === "SignUp" && "goDown"} `}>
                            <Input
                                type="email"
                                placeholder="E-mail"
                                value={values.email || ""}
                                name="email"
                                id="email"
                                autoComplete="email"
                                underline
                                style={{ marginTop: "30px" }}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                            />

                            <Input
                                type="password"
                                placeholder="Password"
                                value={values.password || ""}
                                name="password"
                                id="password"
                                underline
                                autoComplete="password"
                                style={{ marginTop: "30px" }}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                            />

                        </div>
                    </div>

                    <p className="login-form-error-message">{errorMessage}</p>

                    <div className="login-button-container">
                        <Input type="button" id="submit" value={action} onClick={handleSubmit} />
                    </div>

                    <div className="login-footer-text">
                        {action === "Login" ? "Do not have an account? " : "Already have an account? "}
                        <span onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>
                            {action === "Login" ? " SignUp" : " Login"}
                        </span>
                    </div>
                </div>
            </div>
        </BasicPage>
    );
}

export default Login;