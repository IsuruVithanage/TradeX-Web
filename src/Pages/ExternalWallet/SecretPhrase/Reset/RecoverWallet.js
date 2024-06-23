import React, { useState, useEffect, useRef } from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import WalletImage from "../../../../Assets/Images/wallet.png";
import "./RecoverWallet.css";
import { useNavigate, useLocation } from 'react-router-dom';

export default function RecoverWallet() {
    const navigate = useNavigate();
    const userId = useLocation().state;

    const [inputValues, setInputValues] = useState(Array(12).fill(''));
    const [words, setWords] = useState({});
    const inputRefs = useRef([]);

    function navigateToLogin() {
      navigate("/wallet/login");
    }


    function handleInputChange(index, value) {
        setInputValues(prevState => {
            const updatedValues = [...prevState];
            updatedValues[index] = value;
            return updatedValues;
        });
    }


    function handleKeyDown(index, event) {
        if (event.key === 'Enter') {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                inputRefs.current[index].blur(); // Optionally blur the last input field
            }
        }
    }


    function navigateToDashBoard() {
        if (!userId) {
            navigate('/wallet/login');
        }
        // Compare concatenated input values with the word variable
        const isWordChecked = checkWords(inputValues);
        if (isWordChecked) {
          console.log("sucess");
          navigate("/wallet/changePassword");

        } else {
            alert('Incorrect secret phrase');
            // Clear the input fields and reset inputValues array
            setInputValues(Array(12).fill(''));
            // Reset focus to the first input field
            inputRefs.current[0].focus();
        }
    }


    useEffect(() => {
        if (!userId) {
            navigate("/wallet/login");
        }

        fetch("http://localhost:8006/seedphrase/getSeedPreseById", {userId:userId})
        .then((response) => {
            console.log(response)
            setWords(response[0]);
        })
        .catch((error) => {
            console.error("Error fetching words:", error);
        });


        // Initialize inputValues state with empty strings
        setInputValues(Array(12).fill(''));
    }, [userId, navigate]);



   

    function checkWords() {
        // Split the wordString into an array of words
        const wordArray = words.seedphrase.split(' ');

        // Check if the length of wordArray matches the length of inputValues
        if (wordArray.length !== inputValues.length) {
            return false;
        }

        // Iterate over the arrays and compare each word
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] !== inputValues[i]) {
                return false;
            }
        }

        // If all words match
        return true;
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
                        {[...Array(12)].map((_, index) => (
                            <div key={index}>
                                <input
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                     className={`input-col-${index + 1}`}
                                    value={inputValues[index]}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(index, e)}
                                />
                            </div>
                        ))}
                    </div>
            

                <div>
                    <button className='clear-button1' onClick={() => {
                        setInputValues(Array(12).fill(''));
                        inputRefs.current[0].focus();
                    }}>Clear all</button>
                </div>

              

                <div >
                    <button className='confirm-button1' onClick={navigateToDashBoard}>Confirm</button>
                </div>
                <div >
                    <button className='back-to-secret-button1' onClick={navigateToLogin} >Back</button>
                </div>
            </BlackBar>
        </div>
    );
}
