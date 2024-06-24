import React, { useState } from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import "./ChangePassword.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const navigate2 = useNavigate();

  function navigateToRecoverWallet() {
    navigate('/wallet/login/changepassword/recoverwallet');
  }

  function navigateToHaveAccount() {
    navigate2('/wallet/login/haveaccount');
  }

  function clearFields() {
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
    document.getElementById("confirm-password").value = '';
  }

  function validateAndProceed() {
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

    navigateToRecoverWallet();
  }

  return (
    <div className='main-background'>
      <Head />
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

      <BlackBar>
        <h1 className='set-pass'>Change Password</h1>
        <p className='para'>This password is used to protect your wallet and provide access <br /> to the browser web wallet.</p>

        <input type="text" placeholder="Enter your user name" className="change-user-name" id="username" />
        <input type={showPassword ? "text" : "password"} placeholder="Enter your new password" className="password-input1" id="password" />
        <input type={showPassword ? "text" : "password"} placeholder="Confirm your password" className="confirm-password-input1" id="confirm-password" />

        <div className="terms-checkbox">
          <input type="checkbox" id="show-password-checkbox" onChange={() => setShowPassword(!showPassword)} />
          <label htmlFor="show-password-checkbox">Show password</label>
        </div>
        <div>
          <button className='rec-button' onClick={validateAndProceed}>Next</button>
        </div>
        <div>
          <button className='back-to-login-button' onClick={navigateToHaveAccount}>Back</button>
        </div>
      </BlackBar>
    </div>
  );
}
