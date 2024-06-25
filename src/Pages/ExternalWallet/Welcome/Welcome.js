import React from 'react';
import "./Welcome.css";
import TradeImage from "../../../Assets/Images/trade.png";
import WalletImage from "../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigete = useNavigate();

  function navigateToLogin() {
    navigete('/wallet/login');
  }

  return (
    <div className='main-background'>
      <img src={TradeImage} alt="Trade Description" className='trade-img' />

      <div className='head-line'>TradeX &nbsp;<div className='head-line2'> Wallet</div></div>

      <div className='platform'>SIMULATION PLATFORM</div>

      <div className='paragra'> 
           <p>
            Welcome to TradeX Wallet, the ultimate gateway to mastering the future of digital finance.<br/>
            Our platform offers a secure, user-friendly environment for managing your digital assets with<br/> 
            unparalleled ease and confidence. Whether you're a beginner or an experienced trader,<br/>
            TradeX Wallet's simulation mode provides a  risk-free space to practice, learn,and refine your<br/>
            trading strategies.Join us today and start your journey towards financial independence and expertise.
           </p> 
      </div>
      <div >
      <button className='custom-button' onClick={navigateToLogin}>GET START</button>
      </div>

        <img src={WalletImage} alt="Wallet Description" className='wallet-image' />
      
    </div>
  );
}
