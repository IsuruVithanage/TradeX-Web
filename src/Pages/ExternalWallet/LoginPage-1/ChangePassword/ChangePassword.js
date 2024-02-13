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

      </BlackBar>
    </div>
  )
}
