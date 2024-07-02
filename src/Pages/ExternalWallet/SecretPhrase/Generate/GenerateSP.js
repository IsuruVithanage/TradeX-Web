import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { showMessage } from '../../../../Components/Message/Message';
import AuthPage from "../../../../Components/Layouts/AuthPage/AuthPage";
import "./GenerateSP.css";


export default function GenerateSP() {
  const navigate = useNavigate();
  const user = useLocation().state;
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if(!user || !user.userName || !user.password) {
      // Redirect to setpassword if user object is not passed
      navigate("/wallet/create");
    } 

    fetchWords(); // Fetch words when component mounts
    console.log(user);
  }, [navigate, user]);



  function navigateToCreateWallet() {
    navigate("/wallet/create");
  }


  const fetchWords = async () => {
    setIsLoading(true);
      await fetch("http://localhost:8006/seedPhrase/getUniqueShuffledWords")

      .then(async(res) => {
        res = await res.json();
        setIsLoading(false);
        setSeedPhrase(res);
      })

      .catch(() => {
        setIsLoading(false);
        showMessage("error", "Secret Phrase could not be generated. Please try again.")
        console.error("Error fetching words",);
      });
  };


  function navigateToConfirmSecretPhrase() {
    if(!seedPhrase) {
      showMessage("warning", "Please wait for the Seed Phrase to load.");
      return;
    }
    if(!user || !user.userName || !user.password) {
      // Redirect to setPassword if user object is not passed
      navigateToCreateWallet();
    } 
    else {
      navigate('/wallet/secret-phrase/confirm', { state: {...user, seedPhrase } });
    }
  }
  

  

  

  // Function to render words in a table
  function renderWordTable() {
    const words = seedPhrase.split(",");
    const tableRows = [];
    for (let i = 0; i < words.length; i += 3) {
      const rowWords = words.slice(i, i + 3);
      const rowCells = rowWords.map((word, index) => (
        <td key={index} className="word-cell">
          {word}
        </td>
      ));
      tableRows.push( <tr key={i / 3}> {rowCells} </tr> );
    }
    return tableRows;
  }

  return (
    <AuthPage
      title="Secret Phrase"
      description="Back up these 12 words safely on a piece of paper and never share them with anyone. this phrase is required to recover your wallet."
      nextButton="Proceed"
      isLoading={isLoading}
      onNext={navigateToConfirmSecretPhrase}
      onBack={navigateToCreateWallet}
    >

      <div className="word-box">
        <table className="word-table">
          <tbody>{renderWordTable()}</tbody>
        </table>
      </div>
    </AuthPage>
  );
}
