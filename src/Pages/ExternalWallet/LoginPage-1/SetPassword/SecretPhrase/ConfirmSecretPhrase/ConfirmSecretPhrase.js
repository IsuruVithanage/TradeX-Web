import React, { useState, useEffect } from 'react';
import BlackBar from '../../../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../../../Components/WalletComponents/Head';
import WalletImage from "../../../../../../Assets/Images/wallet.png";
import "./ConfirmSecretPhrase.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function ConfirmSecretPhrase() {
    const navigate = useNavigate();
    const { word } = useParams();
    const [inputValues, setInputValues] = useState(Array(12).fill(''));

    useEffect(() => {
        // Initialize inputValues state with empty strings
        setInputValues(Array(12).fill(''));
        console.log("word",word  );
    }, []);

    function handleInputChange(index, value) {
        setInputValues(prevState => {
            const updatedValues = [...prevState];
            updatedValues[index] = value;
            return updatedValues;
        });
    }

    function concatenateInputValues() {
        return inputValues.join(' ');
    }

    function navigateToDashBoard() {
        // Compare concatenated input values with the word variable
        const concatenatedInput = concatenateInputValues();
        if (concatenatedInput === word) {
            navigate('/wallet/dashboard');
        } else {
            alert('Incorrect secret phrase');
        }
    }

    const navigete2 = useNavigate();

    function navigateToSecretPhrase() {
        navigete2('/wallet/login/setpassword/secretphrase');
    }

    return (
        <div className='main-background'>
            <Head />
            <img src={WalletImage} alt="Wallet Description" className='wallet-img' />

            <BlackBar>
                <h1 className='con-secret-phrase'>Confirm Your Secret Phrase</h1>
                <p className='con-secret-para'>Please select each word in the correct order to verify <br />
                    you have saved your Secret Phrase..</p>
                <div>
                    <div>
                        {[...Array(12)].map((_, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    className={`input-col-${index + 1}`}
                                    value={inputValues[index]}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <button className='clear-button'>Clear all</button>
                </div>

                <div className='word-box-2'>
                    <p>Word from URL: {word}</p>
                </div>

                <div >
                    <button className='confirm-button' onClick={navigateToDashBoard}>Confirm</button>
                </div>
                <div >
                    <button className='back-to-secret-button' onClick={navigateToSecretPhrase}>Back</button>
                </div>
            </BlackBar>

        </div>
    )
}
