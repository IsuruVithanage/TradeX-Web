import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showMessage } from '../../../Components/Message/Message';
import { getUser, setUser } from "../../../Storage/SecureLs";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import AuthPage from "../../../Components/Layouts/AuthPage/AuthPage";
import Input from "../../../Components/Input/Input";
import axios from "axios";
import "./LoginAccount.css";


export default function LoginAccount () {
  const user = getUser();  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  function navigateToStart() {
    navigate("/wallet/start");
  }

  function navigateToDashBoard() {
    navigate("/wallet/dashboard");
  }

  function navigateToRest(){
    navigate('/wallet/reset', {state: user.id});
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function clearFields() {
    document.getElementById("wallet-username").value = '';
    document.getElementById("wallet-password").value = '';
  }
  

  function login() {
    const userName = document.getElementById("wallet-username").value.trim();
    const password = document.getElementById("wallet-password").value.trim();

    if (!userName || !password) {
      setErrorMessage("All fields are required. Please fill in all the fields.");
      return;
    }

    setIsLoading(true);
    axios
      .post(
        "http://localhost:8006/walletLogin/login",
        { userName, password },
      )
      .then((res) => {
          // const token = res.data.accessToken;
          const walletUserName = res.data.user.userName;
          const walletId = res.data.user.walletId;

          setUser({...user, walletUserName, walletId});
          // setAccessToken(token);

          setIsLoading(false);
          navigateToDashBoard();
      })

      .catch((error) => {
        setIsLoading(false);
        console.log(error);

        !error.response ?
        showMessage("error", "Login Failed. Please try again") :
        showMessage("error", error.response.data.message);
        clearFields();
      });
  }


  return (
    <AuthPage
      title="Login"
      description="This password is used to protect your wallet and provide access to the browser web wallet."
      nextButton="Login"
      isLoading={isLoading}
      errorMessage={errorMessage} 
      onNext={login}
      onBack={navigateToStart}
    >
      <Input
        type="text"	
        placeholder="Enter user name"
        id="wallet-username"
        name="wallet-username"
        autoComplete="wallet-username"
        underline
        style={{marginTop: "4vh", width: "350px"}}
      />

      <Input
        type="password"
        placeholder="Enter your password"
        id="wallet-password"
        name="wallet-password"
        autoComplete="wallet-password"
        underline
        style={{marginTop: "4vh", width: "350px"}}
      />
  
      <p className="reset-para">
        Can't login? here You can&nbsp;
        <span style={{color: "#21DB9A"}} className="reset-wallet-button" onClick={navigateToRest}>reset</span>
        &nbsp;your password
      </p>
    </AuthPage>
  );
}
