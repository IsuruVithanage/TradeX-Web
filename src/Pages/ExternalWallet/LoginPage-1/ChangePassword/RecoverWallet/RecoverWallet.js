import React from 'react'
import BlackBar from '../../../../../Components/WalletComponents/BlackBar'
import Head from '../../../../../Components/WalletComponents/Head'
import "./RecoverWallet.css";
import WalletImage from "../../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';


export default function RecoverWallet() {
  const navigete = useNavigate();

  function navigateToDashBoard() {
    navigete('/wallet/dashboard');
  }
  const navigete2 = useNavigate();

  function navigateTocPasswordChange() {
    navigete2('/wallet/login/changepassword');
  }
  return (
    <div className='main-background'>
      <Head/>
      <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

      <BlackBar>
      <h1 className='rec-secret-phrase'>Enter Your Seed Phrase</h1>
        <p className='rec-secret-para'>Please enter each word in the correct order <br/>to verify you.</p>
        <div >
                <div> <input type="text"className='input-1'/></div>
                <div><input type="text"className='input-2'/></div>
                <div><input type="text"className='input-3'/></div>
                <div><input type="text"className='input-4'/></div>
             </div>

             <div >
                <div> <input type="text"className='input-5'/></div>
                <div><input type="text"className='input-6'/></div>
                <div><input type="text"className='input-7'/></div>
                <div><input type="text"className='input-8'/></div>
             </div>

             <div >
                <div> <input type="text"className='input-9'/></div>
                <div><input type="text"className='input-10'/></div>
                <div><input type="text"className='input-11'/></div>
                <div><input type="text"className='input-12'/></div>
             </div>

             <div>  
                    <button className='rec-clear-button'>Clear all</button>
             </div>

             <div >
            <button className='dashboard-button'onClick={navigateToDashBoard}>Confirm</button>
            </div>
            <div >
            <button className='back-to-change-button'onClick={navigateTocPasswordChange}>Back</button>
            </div> 
      </BlackBar>
    </div>
  )
}
