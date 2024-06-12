import React from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import "./SetPassword.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../../Features/User'; 
import { useDispatch } from 'react-redux';

export default function SetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateToSecretPhrase() {
    navigate('/wallet/login/setpassword/secretphrase');
  }

  function navigateToLogin() {
    navigate('/wallet/login');
  }

  function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const user = {
      username: username,
      password: password
    };

    dispatch(setUser(user));
    navigateToSecretPhrase();
  }

  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />
      
      <BlackBar>
        <h1 className='set-pass'>Set Password</h1>
        <p className='para-1'>This password is used to protect your wallet and provide access <br/> to the browser web wallet.</p>

        <input type="text" placeholder="Enter your user name" className="user-name" id='username'/>

        <input type="password" placeholder="Enter your new password" className="password-input" id='password'/>
        <input type="password" placeholder="Confirm your password" className="confirm-password-input" id='confirm-password'/>

        <div className="terms-checkbox">
          <input type="checkbox" id="terms-checkbox" />
          <label htmlFor="terms-checkbox">I have read and agree to the Terms of Service</label>
        </div>
        <div>
          <button className='next-button' onClick={register}>Next</button>
        </div>
        <div>
          <button className='back-button' onClick={navigateToLogin}>Back</button>
        </div>
      </BlackBar>
    </div>
  );
}
