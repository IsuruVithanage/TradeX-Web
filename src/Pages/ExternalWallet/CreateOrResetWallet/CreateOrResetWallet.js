import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { showMessage } from '../../../Components/Message/Message';
import { getUser } from "../../../Storage/SecureLs";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import AuthPage from "../../../Components/BasicPage/AuthPage/AuthPage";
import Input from "../../../Components/Input/Input";
import axios from "axios";
import "./CreateOrResetWallet.css";


export default function CreateWallet() {
  const navigate = useNavigate();
  const action = useLocation().pathname.slice(8);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  function navigateToSecretPhrase(user) {
    setIsLoading(false);
    if(action === 'create'){
      navigate('/wallet/secret-phrase', { state: user});
    }
    else{
      navigate('/wallet/secret-phrase/validate', { state: user});
    }
  }


  function goBack() {
    if(action === 'create'){
      navigate('/wallet/start');
    }
    else{
      navigate('/wallet/login');
    }
  }


  function clearFields() {
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
    document.getElementById("confirm-password").value = '';
  }


  function register() {
    const userName = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!userName || !password || !confirmPassword) {
      setErrorMessage("All fields are required. Please fill in all the fields.");
      clearFields();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      clearFields();
      return;
    }

    // Password validations
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      clearFields();
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      clearFields();
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      clearFields();
      return;
    }

    if (!/\d/.test(password)) {
      setErrorMessage("Password must contain at least one number.");
      clearFields();
      return;
    }


    const user = {
      userId: getUser().id,
      userName: userName,
      password: password
    };

    const endPoint = action === 'create' ?
       'http://localhost:8006/walletLogin/checkUsername/' : 
       'http://localhost:8006/seedPhrase/getSeedPhraseByUseName/';

    setIsLoading(true);
    
    axios.get(endPoint + userName)
    .then((res) => navigateToSecretPhrase(
      action === 'create' ? user : {...user, seedPhrase: res.data.seedPhrase}
    ))
    .catch((error) => {
      setIsLoading(false);
      if(error.response){
        showMessage("error", error.response.data.message);
      } else {
        showMessage("error", "An error occurred. Please try again.");
      }
      clearFields();
    });

  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <AuthPage
      title={(action === 'create' ? "Set " : "Reset ") + "Password"}
      description="This password is used to protect your wallet and provide access to the browser web wallet."
      isLoading={isLoading}
      errorMessage={errorMessage}
      onNext={register}
      onBack={goBack}
    >
      <Input
        type="text"	
        placeholder="Enter user name"
        id="username"
        className="login-input"
        style={{marginTop: "2vh", width: "350px"}}
      />

      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Enter New password"
        id="password"
        className="login-input"
        style={{marginTop: "4vh", width: "350px"}}
      />

      <div className="login-password-container">
        <div style={{width: "90%", zIndex: "1"}}><Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          id="confirm-password"
          className="login-input"/>
        </div>

        <div className="show-password-icon" onClick={toggleShowPassword}>
          {!showPassword ? <PiEyeClosed /> : <PiEye />}
        </div>

        <div className="login-password-bottom-layer"/>
      </div>
  
      <p className="reset-para">
        {action === 'create' ? "Already have Account? " : "Do you remember the password? "}You can&nbsp;
        <span style={{color: "#21DB9A"}} className="reset-wallet-button" onClick={() => navigate('/wallet/login')}>login</span>
        &nbsp;here
      </p>
    </AuthPage>
  );
}
