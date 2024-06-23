import React, {useEffect, useState} from 'react';
import "./GenerateSP.css";
import BlackBar from "../../../../Components/WalletComponents/BlackBar";
import Head from "../../../../Components/WalletComponents/Head";
import WalletImage from "../../../../Assets/Images/wallet.png";
import { useNavigate, useLocation } from "react-router-dom";


export default function GenerateSP() {
  const navigate = useNavigate();
  const user = useLocation().state;
  const [words, setWords] = useState([]);


  useEffect(() => {
    if(!user || !user.username || !user.password) {
      // Redirect to setpassword if user object is not passed
      navigateToCreateWallet();
    } 
    fetchWords(); // Fetch words when component mounts
    console.log(user);
  }, []);

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


  function navigateToConfirmSecretPhrase() {
    const seedphrase = words.join(' ');

    if(!user || !user.username || !user.password) {
      // Redirect to setpassword if user object is not passed
      navigateToCreateWallet();
    } else {
      navigate('/wallet/secret-phrase/confirm', { state: {...user, seedphrase } });
    }
  }
  

  function navigateToCreateWallet() {
    navigate("/wallet/create");
  }

  

  // Function to render words in a table
  function renderWordTable() {
    const tableRows = [];
    for (let i = 0; i < words.length; i += 3) {
      const rowWords = words.slice(i, i + 3);
      const rowCells = rowWords.map((word, index) => (
        <td key={index} className="word-cell">
          {word}
        </td>
      ));
      tableRows.push(
        <tr key={i / 3} className="word-row">
          {rowCells}
        </tr>
      );
    }
    return tableRows;
  }

  return (
    <div className="main-background">
      <Head />
      <img src={WalletImage} alt="Wallet Description" className="wallet-img" />
      <BlackBar>
        <h1 className="secret-phrase">Back Up Your Secret Phrase</h1>
        <p className="secret-para">
          Back up these 12 words safely on a piece of paper and never share <br></br>them
          with anyone.
        </p>
        <div className="word-box">
          <table className="word-table">
            <tbody>{renderWordTable()}</tbody>
          </table>
        </div>

        <div>
          <button
            className="proceed-button"
            onClick={navigateToConfirmSecretPhrase}
          >
            Proceed
          </button>
        </div>
        <div>
          <button className="cancel-btn" onClick={navigateToCreateWallet}>
            Cancel
          </button>
        </div>
      </BlackBar>
    </div>
  );
}
