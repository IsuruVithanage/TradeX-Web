import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { showMessage } from '../../../../Components/Message/Message';
import { getUser, setUser } from "../../../../Storage/SecureLs";
import AuthPage from "../../../../Components/BasicPage/AuthPage/AuthPage";
import axios from "axios";
import "./ConfirmSP.css";


export default function ConfirmSP() {
    const navigate = useNavigate();
    const type = useLocation().pathname.slice(22);
    const [inputValues, setInputValues] = useState(Array(12).fill(''));
    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefs = useRef([]);
    const seedPraseDetails = useLocation().state;
    const word = !seedPraseDetails ? {} : seedPraseDetails.seedPhrase;

    console.log("seedPraseDetails", seedPraseDetails);

    

    useEffect(() => {
        if( !seedPraseDetails || 
            !seedPraseDetails.seedPhrase || 
            !seedPraseDetails.password || 
            !seedPraseDetails.userName
        ) {
            if (type === 'confirm') {
                navigate('/wallet/create');
            } else {
                navigate('/wallet/reset');
            }
        }

        fetchWords();

        // Initialize inputValues state with empty strings
        clearAll();
    }, [seedPraseDetails, type, navigate]);


    function clearAll() {
        setErrorMessage('');
        setInputValues(Array(12).fill(''));
        inputRefs.current[0].focus();
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
                inputRefs.current[0].focus();
            }
        } else {
            inputRefs.current[index].focus();
        }
    }


    const registerOrResetUser = async () => {
        try {
            setIsLoading(true);
            const endPoint = "http://localhost:8006/walletLogin/" + (type === 'confirm' ? "register"  : "reset");

            await axios.post(endPoint, seedPraseDetails)
            .then((res) => {
                const user = getUser();
                const walletUserName = res.data.user.userName;
                const walletId = res.data.user.walletId;

                setUser({...user, walletUserName, walletId});
                setIsLoading(false);
                navigate('/wallet/dashboard');
            })
            .catch((error) => {
                setIsLoading(false);
                console.log("Error sending data:", error);

                error.response ?
                showMessage("error", error.response.data.message) :
                showMessage("error", "An error occurred. Please try again.");
            })
        } catch (error) {
            console.log("Error sending data:", error);
            showMessage("error", "An error occurred. Please try again.");
        }
    };


    function navigateToDashBoard() {
        if( !seedPraseDetails || 
            !seedPraseDetails.seedPhrase || 
            !seedPraseDetails.password || 
            !seedPraseDetails.userName
        ) {
            if (type === 'confirm') {
                navigate('/wallet/create');
            } else {
                navigate('/wallet/reset');
            }
        }

        // Compare concatenated input values with the word variable
        const isWordChecked = checkWords(word, inputValues);
        if (isWordChecked) {
            registerOrResetUser();
        }
        else {
            // Clear the input fields and reset inputValues array
            clearAll();
            setErrorMessage('Incorrect secret phrase');
        }
    }


    function goBack() {
        if (type === 'confirm') {
            navigate('/wallet/secret-phrase', { state: seedPraseDetails });
        } else {
            navigate('/wallet/reset');
        }
    }


    const fetchWords = async () => {
        setIsLoading(true);
        fetch("http://localhost:8006/seedPhrase/getWords")
        .then(async(res) => {
            res =  await res.json();
            setWords(res);
            setIsLoading(false);
        })
        .catch(() => {
            setIsLoading(false);
            console.error("Error fetching words",);
        });
    };

    function renderWordTable() {
        const tableRows = [];
        for (let i = 0; i < words.length; i += 4) {
            const rowWords = words.slice(i, i + 4);
            const rowCells = rowWords.map((word, index) => (
                <td key={index} className="word-cell-confirm">
                    {word}
                </td>
            ));
            tableRows.push(<tr key={i / 4}> {rowCells} </tr>);
        }
        return tableRows;
    }


    function checkWords(wordString, inputValues) {
        // Split the wordString into an array of words
        const wordArray = wordString.split(',');

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
        <AuthPage
            title="Confirm Secret Phrase"
            description="Please insert each word in the correct order to verify. you have saved your Secret Phrase.."
            nextButton="Confirm"
            isLoading={isLoading}
            errorMessage={errorMessage}
            onNext={navigateToDashBoard}
            onBack={goBack}
        >
                
                <div>
                    {[...Array(4)].map((v, rowNo) => (
                        <div key={rowNo} className='input-row'>
                            {[...Array(3)].map((v, colNo) => {
                                const index = (rowNo * 3) + colNo;
                                return (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        className='input-cell'
                                        value={inputValues[index]}
                                        onChange={e => handleInputChange(index, e.target.value)}
                                        onKeyDown={e => handleKeyDown(index, e)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <button className='clear-button' onClick={clearAll}>Clear All</button>

                <div className='word-box-confirm'>
                    <table className="word-table-confirm">
                        <tbody>{renderWordTable()}</tbody>
                    </table>
                </div>
        </AuthPage>
    );
}
