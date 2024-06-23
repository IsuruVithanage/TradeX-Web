import React, { useState } from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import "./ChangePassword.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function validateAndProceed() {
    console.log('Validating and Proceeding');
  }

  function navigateToLogin() {
    navigate('/wallet/login');
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
        <div >
        <button className='back-to-login-button' onClick={navigateToLogin}>Back</button>
        </div>
      </BlackBar>
    </div>
  );
}
