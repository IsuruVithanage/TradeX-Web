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

      <div className='paragra'>      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/>  Lorem Ipsum has been the industry's standard  dummy text ever since the 1500s,<br/> when an unknown printer took a galley of type and
         scrambled it to make a type specimen book. <br/> It has survived not only five centuries, but also the leap into electronic typesetting,<br/> remaining essentially unchanged. <br/> It was popularised in the 1960s </p> 
      </div>
      <div >
      <button className='custom-button' onClick={navigateToLogin}>GET START</button>
      </div>

        <img src={WalletImage} alt="Wallet Description" className='wallet-image' />
      
    </div>
  );
}
