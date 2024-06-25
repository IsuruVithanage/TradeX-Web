import React from 'react'
import AuthPage from '../../../Components/Layouts/AuthPage/AuthPage';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./StartPage.css";



export default function StartPage() {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate('/wallet/login');
  }

  function navigateToCreateWallet() {
    navigate('/wallet/create');
  }


  return (
    <AuthPage 
      buttons={false} 
      title={<span>Welcome to the<br/>TradeX Wallet</span>}
      description="The multi-chain wallet trusted by millions"
    >

      <div className='create-wallet-container' style={{marginTop: "4vh"}} onClick={navigateToCreateWallet}>
        <div style={{width: "80%"}}>
          <p className='wallet-start-heading'>Create a new wallet</p>
          <p className='wallet-start-description'>Start fresh with a new wallet</p>
        </div>
        <div className='wallet-start-arrow-icon'>
          <FaArrowRight className='arrow-icon'/>
        </div>
      </div>

      <hr className='wallet-middle-line'/>

      <div className='create-wallet-container' style={{marginBottom: "5vh"}}  onClick={navigateToLogin}>
        <div style={{width: "80%"}}>
          <p className='wallet-start-heading'>Login to the wallet</p>
          <p className='wallet-start-description'>Start with a existing wallet</p>
        </div>
        <div className='wallet-start-arrow-icon'>
          <FaArrowRight className='rec-arrow-icon'/>
        </div>
      </div>
    </AuthPage>
  )
}
