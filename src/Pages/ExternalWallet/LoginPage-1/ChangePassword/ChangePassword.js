import React from 'react'
import BlackBar from '../../../../Components/WalletComponents/BlackBar'
import Head from '../../../../Components/WalletComponents/Head'
import "./ChangePassword.css";
import WalletImage from "../../../../Assets/Images/wallet.png";



export default function ChangePassword() {
  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

      <BlackBar>
      <h1 className='set-pass'>Change Password</h1>
        <p className='para'>This password is used to protect your wallet and provide access <br/> to the browser web wallet.</p>
        
        <input type="password" placeholder="Enter your new password" className="password-input" />
        <input type="password" placeholder="Confirm your password" className="confirm-password-input" />

        <div className="terms-checkbox">
          <input type="checkbox" id="terms-checkbox" />
          <label htmlFor="terms-checkbox">I have read and agree to the Terms of Service</label>
        </div>
        <div >
      <button className='next-button' >Next</button>
      </div>
      <div >
      <button className='back-button' >Back</button>
      </div>
      </BlackBar>
    </div>
  )
}
