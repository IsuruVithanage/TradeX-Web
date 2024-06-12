import React from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import "./SetPassword.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';


export default function SetPassword() {
  const navigete = useNavigate();

  function navigateToSecretPhrase() {
    navigete('/wallet/login/setpassword/secretphrase');
  }
  const navigete2 = useNavigate();

  function navigateToLogin() {
    navigete2('/wallet/login');
  }

  function register() {
    
  }

  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />
      
      <BlackBar>
        <h1 className='set-pass'>Set Password</h1>
        <p className='para-1'>This password is used to protect your wallet and provide access <br/> to the browser web wallet.</p>

        <input type="text" placeholder="Enter your user name" className="user-name" />

        <input type="password" placeholder="Enter your new password" className="password-input" />
        <input type="password" placeholder="Confirm your password" className="confirm-password-input" />


        <div className="terms-checkbox">
          <input type="checkbox" id="terms-checkbox" />
          <label htmlFor="terms-checkbox">I have read and agree to the Terms of Service</label>
        </div>
        <div >
      <button className='next-button'  onClick={navigateToSecretPhrase} >Next</button>
      </div>
      <div >
      <button className='back-button' onClick={navigateToLogin}>Back</button>
      </div>
      </BlackBar>
    </div>
  );
}
