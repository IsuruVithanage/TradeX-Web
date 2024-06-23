import React, { useState } from 'react';
import BlackBar from '../../../Components/WalletComponents/BlackBar';
import Head from '../../../Components/WalletComponents/Head';
import "./CreateWallet.css";
import WalletImage from "../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../Storage/SecureLs';
import axios from 'axios';

export default function CreateWallet() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function navigateToGenerateSP(user) {
    navigate('/wallet/secret-phrase', { state: user});
  }

  function navigateToStart() {
    navigate('/wallet/start');
  }

  function clearFields() {
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
    document.getElementById("confirm-password").value = '';
  }

  function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!username || !password || !confirmPassword) {
      alert("All fields are required. Please fill in all the fields.");
      clearFields();
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      clearFields();
      return;
    }

    // Password validations
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      clearFields();
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
      clearFields();
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      clearFields();
      return;
    }

    if (!/\d/.test(password)) {
      alert("Password must contain at least one number.");
      clearFields();
      return;
    }

    const user = {
      userId: getUser().id,
      username: username,
      password: password
    };

    axios.get('http://localhost:8006/walletLogin/checkUsername/' + username)
      .then(() => navigateToGenerateSP(user))
      .catch((error) => {
        if(error.response){
          alert(error.response.data.message);
        } else {
          alert("An error occurred. Please try again.");
        }
        clearFields();
      });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />
      
      <BlackBar>
        <h1 className='set-pass'>Set Password </h1>
        <p className='para-1'>This password is used to protect your wallet and provide access <br/> to the browser web wallet.</p>

        <input type="text" placeholder="Enter your user name" className="user-name" id='username'/>
        <input type={showPassword ? "text" : "password"} placeholder="Enter your new password" className="pass-input" id='password'/>
        <input type={showPassword ? "text" : "password"} placeholder="Confirm your password" className="confirm-password-input" id='confirm-password'/>

        <div className="terms-checkbox1">
          <input 
            type="checkbox" 
            id="show-password-checkbox" 
            checked={showPassword}
            onChange={toggleShowPassword} 
          />
          <label htmlFor="show-password-checkbox">Show Password</label>
        </div>
        <div>
          <button className='next-button' onClick={register}>Next</button>
        </div>
        <div>
          <button className='back-button' onClick={navigateToStart}>Back</button>
        </div>
      </BlackBar>
    </div>
  );
}
