import React,{useEffect,useState} from "react";
import BlackBar from "../../../../Components/WalletComponents/BlackBar";
import Head from "../../../../Components/WalletComponents/Head";
import "./HaveAccount.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from "react-router-dom";
import Input from "../../../../Components/Input/Input";
import axios from "axios";
import { showMessage } from '../../../../Components/Message/Message';
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../../../Features/authSlice';

export default function () {

  const [state, setState] = useState("login")

  const dispatch = useDispatch();

  const userTemp = localStorage.getItem('user');

  const user = JSON.parse(userTemp);  

  const navigete = useNavigate();
  
  const navigete2 = useNavigate();

  function navigateToLogin() {
    navigete2("/wallet/login");
  }
  const navigete3 = useNavigate();

  function navigateToDashBoard() {
    navigete3("/wallet/dashboard");
  }

  function navigateToSeedPrase(){
    navigete(`/wallet/login/changepassword/recoverwallet?userId=${user.user.id}`);
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
       
          const token = res.data.accessToken;
                const user = res.data.user;

                console.log('User', user);

                localStorage.setItem('user', JSON.stringify(user));
                dispatch(setAccessToken(token));
                console.log('Access token ', token);
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
        <h1 className="set-pass">{state==="login" ? "LOGIN" : "Recover Wallet"}</h1>
        <p className="para">{state==="login" ? "This password is used to protect your wallet and provide access to the browser web wallet." : 
         "This password is used to protect your wallet and provide access to the browser web wallet."}
        </p>

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
            placeholder={state==="login" ? "Enter your password" : "Enter your new password"}
            id="password"
            className="login-input"
            style={{ marginTop: "25px" }}
          />
        </div>



        <div>
          <p className="reset-para">{state=== "login" ? "Can't login? You can erase your current wallet and set up a new one" :  ""}
           
          </p>
        </div>

        <div>
          <button className="reset-button" onClick={navigateToSeedPrase}>
            Reset Wallet
          </button>
        </div>
        <div>
          <button className="dash-button" onClick={login}>
            Unlock
          </button>
        </div>

        <div>
          <button className="back-to-login-button" onClick={navigateToLogin}>
            Back
          </button>
        </div>
      </BlackBar>
    </div>
  );
}
