import React, { useState, useEffect, useRef } from 'react';
import BlackBar from '../../../../Components/WalletComponents/BlackBar';
import Head from '../../../../Components/WalletComponents/Head';
import WalletImage from "../../../../Assets/Images/wallet.png";
import axios from "axios";
import "./ConfirmSP.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, setUser } from '../../../../Storage/SecureLs';


export default function ConfirmSP() {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState(Array(12).fill(''));
    const [words, setWords] = useState([]);
    const inputRefs = useRef([]);
    const seedPraseDetails = useLocation().state;
    const word = !seedPraseDetails ? {} : seedPraseDetails.seedphrase;

    console.log("seedPraseDetails", seedPraseDetails);

    

    useEffect(() => {
        if( !seedPraseDetails || 
            !seedPraseDetails.seedphrase || 
            !seedPraseDetails.password || 
            !seedPraseDetails.username
        ) {
            navigate('/wallet/login/setpassword');
        }
        fetchWords();
        // Initialize inputValues state with empty strings
        setInputValues(Array(12).fill(''));
    }, [seedPraseDetails, navigate]);



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


    const saveSeedPrase = async () => {
        try {
            await axios.post("http://localhost:8006/walletLogin/register", seedPraseDetails)
            .then((res) => {
                const user = getUser();
                const walletUserName = res.data.user.userName;
                const walletId = res.data.user.walletId;

                setUser({...user, walletUserName, walletId});
                navigate('/wallet/dashboard');
            })
            .catch((error) => {
                console.log("Error sending data:", error);
            })
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };


    function navigateToDashBoard() {
        if( !seedPraseDetails || 
            !seedPraseDetails.seedphrase || 
            !seedPraseDetails.password || 
            !seedPraseDetails.username
        ) {
            navigate('/wallet/create');
        }

        // Compare concatenated input values with the word variable
        const isWordChecked = checkWords(word, inputValues);
        if (isWordChecked) {
            
            saveSeedPrase();
        }
         else {
            alert('Incorrect secret phrase');
            // Clear the input fields and reset inputValues array
            setInputValues(Array(12).fill(''));
            // Reset focus to the first input field
            inputRefs.current[0].focus();
        }
    }

    function navigateToGenerateSP() {
        navigate('/wallet/secret-phrase', { state: seedPraseDetails });
    }

    const fetchWords = async () => {
        try {
            const response = await fetch("http://localhost:8006/seedphrase/getUniqueShuffledWords"); // Replace "/api/words" with your actual endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch words");
            }
            const data = await response.json();
            setWords(data.words); // Assuming your API returns an object with a "words" property containing the array of words
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

    function renderWordTable() {
        const tableRows = [];
        for (let i = 0; i < words.length; i += 4) {
            const rowWords = words.slice(i, i + 4);
            const rowCells = rowWords.map((word, index) => (
                <td key={index} className="word-cell">
                    {word}
                </td>
            ));
            tableRows.push(
                <tr key={i / 4} className="word-row">
                    {rowCells}
                </tr>
            );
        }
        return tableRows;
    }

    function checkWords(wordString, inputValues) {
        // Split the wordString into an array of words
        const wordArray = wordString.split(' ');

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
                </div>

                <div>
                    <button className='clear-button' onClick={() => {
                        setInputValues(Array(12).fill(''));
                        inputRefs.current[0].focus();
                    }}>Clear all</button>
                </div>

                <div className='word-box-2'>
                    <table className="word-table">
                        <tbody>{renderWordTable()}</tbody>
                    </table>
                </div>

                <div >
                    <button className='confirm-button' onClick={navigateToDashBoard}>Confirm</button>
                </div>
                <div >
                    <button className='back-to-secret-button' onClick={navigateToGenerateSP}>Back</button>
                </div>
            </BlackBar>
        </div>
    );
}
