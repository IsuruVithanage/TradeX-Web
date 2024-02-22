import React from 'react'
import BlackBar from '../../../../Components/WalletComponents/BlackBar'
import Head from '../../../../Components/WalletComponents/Head'
import "./HaveAccount.css";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';


export default function () {
    const navigete = useNavigate();

  function navigateToChangePassword() {
    navigete('/wallet/login/changepassword');
  }
  const navigete2 = useNavigate();

  function navigateToLogin() {
    navigete2('/wallet/login');
  }
  const navigete3 = useNavigate();

  function navigateToDashBoard() {
    navigete3('/wallet/dashboard');
  }
  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

      <BlackBar>
      <h1 className='set-pass'>Enter Your password </h1>
        <p className='para'>This password is used to protect your wallet and provide access <br/> to the browser web wallet.</p>
        
        <input type="password" placeholder="Enter your password" className="password-input" />

        <div >
        <p className='reset-para'>Can't login? You can erase your current wallet and <br/> set up a new one</p>
        </div>
        <div> 
             <button className='reset-button' onClick={navigateToChangePassword} >Reset Wallet</button></div>
        <div >
        <button className='dash-button' onClick={navigateToDashBoard} >Unlock</button>
        </div>
        <div >
        <button className='back-to-login-button' onClick={navigateToLogin}>Back</button>
        </div>
      </BlackBar>
    </div>
  )
}
