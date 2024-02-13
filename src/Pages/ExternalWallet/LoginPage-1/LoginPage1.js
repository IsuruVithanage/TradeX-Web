import React from 'react'
import BlackBar from '../../../Components/WalletComponents/BlackBar'
import Head from '../../../Components/WalletComponents/Head'
import "./LoginPage1.css";
import WalletImage from "../../../Assets/Images/wallet.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




export default function LoginPage1() {
  const navigete1 = useNavigate();

  function navigateToChangePassword() {
    navigete1('/wallet/login/changepassword');
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
      <h1 className='wel'>Welcome To The <br/>TradeX Wallet</h1>
      <p className='par'>The multi - chain wallet trusted by millions</p>

      <div  onClick={navigateToSetPassword} style={{cursor:"pointer"}}>
        <p className='new-wallet'>Create a new walllet</p>
        <p className='start'>start fresh with a new wallet</p>
        <  FaArrowRight className='arrow-icon'/>
      </div>

      <hr className='w-line'/>
      
      <div  onClick={navigateToChangePassword} style={{cursor:"pointer"}}>
        <p className='rec-wallet'>Already have wallet</p>
        <p className='secret'>Import with your secret phrase</p>
        <  FaArrowRight className='rec-arrow-icon'/>
      </div>
    </BlackBar>
    </div> 
  )
}
