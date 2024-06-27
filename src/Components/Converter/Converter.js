import React, {useState} from 'react';
import Input from "../Input/Input";
import coins from '../../Assets/Images/Coin Images.json';


const CurrencyConverter = ({symbol}) => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState(symbol);
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState('');
    const [error, setError] = useState('')

    const options = Object.keys(coins).map(coin => ({value: coin, label: coins[coin].name}));

    const handleConvert = () => {
        const apiKey = "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
        const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${toCurrency}&tsyms=${fromCurrency}&api_key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data[fromCurrency];
                const convertedResult = amount / rate;
                setResult(`${amount} ${fromCurrency} is equal to ${convertedResult.toFixed(8)} ${toCurrency}`);
                setError('');
            })
            .catch(error => {
                setResult('');
                setError('Error: Unable to fetch exchange rate.');
                console.error(error);
            });
    };


    return (
        <div>
            <Input type="dropdown" label='From' value={fromCurrency} onChange={setFromCurrency}
                options={options.filter(option => option.value !== toCurrency)}
            />

            <Input type="dropdown" label='To' value={toCurrency} onChange={setToCurrency}
                options={options.filter(option => option.value !== fromCurrency)}
            />

            <Input type="number"  label='Amount' defaultValue={1} min={0}  onChange={(value) => {setAmount(value || 1)  }}/>

            <p id="result" style={ !(error) ? {height: "25px", fontWeight:'bold'} : {height: "25px", color: 'red'}}>
                {!error ? result : error}
            </p>

            <Input type="button" value="Convert" onClick={handleConvert} />
        </div>
    );
};

export default CurrencyConverter;
