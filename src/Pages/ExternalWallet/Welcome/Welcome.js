import React from 'react';
import "./Welcome.css";
import TradeImage from "../../../Assets/Images/trade.png";
import WalletImage from "../../../Assets/Images/wallet.png";

export default function Welcome() {
  return (
    <div className='main-background'>
      <img src={TradeImage} alt="Trade Description" className='trade-img' />

      <div className='head-line'>TradeX &nbsp;<div className='head-line2'> Wallet</div></div>

      <div className='para'>      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/>  Lorem Ipsum has been the industry's standard  dummy text ever since the 1500s,<br/> when an unknown printer took a galley of type and
         scrambled it to make a type specimen book. <br/> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br/> It was popularised in the 1960s </p>
      </div>
        <img src={WalletImage} alt="Wallet Description" className='wallet-img' />
      
    </div>
  );
}
