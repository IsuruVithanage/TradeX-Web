import React from 'react';
import "./Home.css";
import TradeImage from "../../../Assets/Images/trade.png";
import WalletImage from "../../../Assets/Images/wallet.png";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function navigateToStart() {
    navigate('/wallet/start');
  }

  return (
    <div className='main-background'>
      <img src={TradeImage} alt="Trade Description" className='trade-img' />

      <div className='head-line'>TradeX &nbsp;<div className='head-line2'> Wallet</div></div>

      <div className='platform'>SIMULATION PLATFORM</div>

      <div className='paragra'>      <p>Welcome to TradeX Wallet, your gateway to the future of finance.<br/>  Experience seamless management of your digital assets, executed with security and simplicity.<br/> Join us today and embark on a revolutionary journey towards financial freedom.<br/> It has survived not only five centuries, but also the leap into electronic typesetting,<br/> remaining essentially unchanged. <br/> It was popularised in the 1960s </p> 
      </div>
      <div >
      <button className='custom-button' onClick={navigateToStart}>GET START</button>
      </div>

        <img src={WalletImage} alt="Wallet Description" className='wallet-image' />
      
    </div>
  );
}
