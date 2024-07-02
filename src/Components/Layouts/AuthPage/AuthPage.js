import React from 'react';
import BasicPage from '../BasicPage/BasicPage';
import WalletImage from "../../../Assets/Images/wallet.png";
import Input from '../../Input/Input';
import "./AuthPage.css";


export default function AuthPage(props) {
    const { isLoading, title, description, errorMessage, buttons, isNextActive, nextButton, onNext, onBack } = props;
  return (
    <BasicPage
        isLoading={isLoading}
        sideNavBar={false}
        topNavBar={false}
        >
        <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
            <div className='wallet-title'>
                TradeX &nbsp;<span style={{color: "#21DB9A"}}> Wallet</span>
            </div>    

            <div className='wallet-img-container'>
                <img src={WalletImage} alt="TradeX Wallet" className='TradeX-Wallet-img' />
            </div> 

            <div className='auth-form-main-container'>
                <div className='auth-form-container'>
                    <h1 className='auth-form-title'>{title}</h1>

                    <p className='auth-form-description'>{description}</p>

                    <div className='auth-form-input-container'>{props.children}</div>

                    <p className='auth-form-error-message'>{errorMessage}</p>

                    {(buttons === undefined || buttons ) &&
                    <div className='auth-form-button-container'>
                        <button className='auth-form-back-button' onClick={onBack}>Back</button>
                        <Input type='button' value={nextButton || 'Next'} disabled = {isNextActive === false} style={{width: "120px"}} onClick={onNext}/>
                    </div>}
                </div>
            </div>
        </div>
    </BasicPage>
  )
}
