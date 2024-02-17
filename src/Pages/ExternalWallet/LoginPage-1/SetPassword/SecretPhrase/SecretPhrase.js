import React from 'react'
import "./SecretPhrase.css";
import BlackBar from '../../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../../Components/WalletComponents/Head';
import WalletImage from "../../../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';


export default function SecretPhrase() {
    const navigete = useNavigate();

    function navigateToConfirmSecretPhrase() {
      navigete('/wallet/login/setpassword/secretphrase/confirmsecretphrase');
    }
    const navigete2 = useNavigate();
  
    function navigateToSetPassword() {
      navigete2('/wallet/login/setpassword');
    }
  return (
    <div className='main-background'>
        <Head/>
        <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

        <BlackBar>
        <h1 className='secret-phrase'>Back Up Your Secret Phrase</h1>
        <p className='secret-para'>Back up safely these 12 words in a piece of paper <br/>
             and never share it with anyone.</p>

         <div className='word-box'></div>   

         <div >
      <button className='proceed-button'onClick={navigateToConfirmSecretPhrase}>Proceed</button>
      </div>
      <div >
      <button className='cancle-button'onClick={navigateToSetPassword}>Cancle</button>
      </div> 

        </BlackBar>
    </div>
  )
}
