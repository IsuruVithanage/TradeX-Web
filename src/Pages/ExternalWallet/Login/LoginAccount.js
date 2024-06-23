import React from "react";
import BlackBar from "../../../Components/WalletComponents/BlackBar";
import Head from "../../../Components/WalletComponents/Head";
import "./LoginAccount.css";
import WalletImage from "../../../Assets/Images/wallet.png";
import { useNavigate } from "react-router-dom";
import Input from "../../../Components/Input/Input";
import axios from "axios";
import { showMessage } from '../../../Components/Message/Message';
import { getUser, setUser } from "../../../Storage/SecureLs";

export default function LoginAccount () {
  const user = getUser();  
  const navigate = useNavigate();
  

  function navigateToStart() {
    navigate("/wallet/start");
  }

  function navigateToDashBoard() {
    navigate("/wallet/dashboard");
  }

  function navigateToRest(){
    navigate('/wallet/recover', {state: user.id});
  }
  

  function login() {
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);

    axios
      .post(
        "http://localhost:8080/walletLogin/login",
        {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        },
      
      )
      .then((res) => {
          // const token = res.data.accessToken;
          const walletUserName = res.data.user.userName;

          console.log('User', user);

          setUser({...user, walletUserName});
          // setAccessToken(token);
          console.log('Login success');
          navigateToDashBoard();

      })

      .catch((error) => {
        console.log(error);
        showMessage("error", "inavalid username or password");
      });
  }
  return (
    <div className="main-background">
      <Head />
      <img src={WalletImage} alt="Wallet Description" className="wallet-img" />

      <BlackBar>
        <h1 className="set-pass">LOGIN</h1>
        <p className="para">This password is used to protect your wallet and provide access to the browser web wallet.</p>

        <div style={{ width: "58%", margin: "auto" }}>
          <Input
            type="text"
            placeholder="Enter user name"
            id="username"
            className="login-input"
            style={{ marginTop: "27px" }}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="login-input"
            style={{ marginTop: "25px" }}
          />
        </div>



        <div>
          <p className="reset-para">Can't login? You can erase your current wallet and set up a new one</p>
        </div>

        <div>
          <button className="reset-button" onClick={navigateToRest}>
            Reset Wallet
          </button>
        </div>
        <div>
          <button className="dash-button" onClick={login}>
            Unlock
          </button>
        </div>

        <div>
          <button className="back-to-login-button" onClick={navigateToStart}>
            Back
          </button>
        </div>
      </BlackBar>
    </div>
  );
}
