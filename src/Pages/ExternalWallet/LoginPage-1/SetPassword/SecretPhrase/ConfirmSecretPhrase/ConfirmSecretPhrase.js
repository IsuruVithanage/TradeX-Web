import React from 'react'
import BlackBar from '../../../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../../../Components/WalletComponents/Head';
import WalletImage from "../../../../../../Assets/Images/wallet.png";
import "./ConfirmSecretPhrase.css"
import { useNavigate } from 'react-router-dom';


export default function ConfirmSecretPhrase() {
    const navigete = useNavigate();

    function navigateToDashBoard() {
      navigete('/wallet/dashboard');
    }
    const navigete2 = useNavigate();
  
    function navigateToSecretPhrase() {
      navigete2('/wallet/login/setpassword/secretphrase');
    }
  return (
    <div className='main-background'>
        <Head/>
        <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

        <BlackBar>
        <h1 className='con-secret-phrase'>Confirm Your Secret Phrase</h1>
        <p className='con-secret-para'>Please select each word in the correct order to verify <br/>
             you have saved your Secret Phrase..</p>

             <div >
                <div> <input type="text"className='input-col-1'/></div>
                <div><input type="text"className='input-col-2'/></div>
                <div><input type="text"className='input-col-3'/></div>
                <div><input type="text"className='input-col-4'/></div>
             </div>

             <div >
                <div> <input type="text"className='input-col-5'/></div>
                <div><input type="text"className='input-col-6'/></div>
                <div><input type="text"className='input-col-7'/></div>
                <div><input type="text"className='input-col-8'/></div>
             </div>

             <div >
                <div> <input type="text"className='input-col-9'/></div>
                <div><input type="text"className='input-col-10'/></div>
                <div><input type="text"className='input-col-11'/></div>
                <div><input type="text"className='input-col-12'/></div>
             </div>

             <div>  
                    <button className='clear-button'>Clear all</button>
             </div>

             <div className='word-box-2'> </div>
             
             <div >
            <button className='confirm-button'onClick={navigateToDashBoard}>Confirm</button>
            </div>
            <div >
            <button className='back-to-secret-button'onClick={navigateToSecretPhrase}>Back</button>
            </div> 



        </BlackBar>

    </div>
  )
}
