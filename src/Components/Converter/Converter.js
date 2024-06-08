import React, {useState} from 'react';
import './Converter.css';
import Input from "../Input/Input";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BTC');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

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

    const handleCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    }


    return (
        <div className="container">

            <div>
                <Input type="dropdown" label='From' value={fromCurrency} onChange={setFromCurrency}
                       options={[
                        {value: 'USD', label: 'USD - US Dollar'},
                        {value: 'EUR', label: 'EUR - Euro'},
                        {value: 'GBP', label: 'GBP - British Pound'},
                        {value: 'CAD', label: 'CAD - Canadian Dollar'},
                        {value: 'AUD', label: 'AUD - Australian Dollar'},
                        {value: 'JPY', label: 'JPY - Japanese Yen'},
                        {value: 'INR', label: 'INR - Indian Rupee'},
                        {value: 'NZD', label: 'NZD - New Zealand Dollar'},
                        {value: 'CHF', label: 'CHF - Swiss Franc'},
                        {value: 'ZAR', label: 'ZAR - South African Rand'},
                        {value: 'BGN', label: 'BGN - Bulgarian Lev'},
                        {value: 'SGD', label: 'SGD - Singapore Dollar'},
                        {value: 'HKD', label: 'HKD - Hong Kong Dollar'},
                        {value: 'SEK', label: 'SEK - Swedish Krona'},
                        {value: 'THB', label: 'THB - Thai Baht'},
                        {value: 'HUF', label: 'HUF - Hungarian Forint'},
                        {value: 'CNY', label: 'CNY - Chinese Yuan Renminbi'},
                        {value: 'NOK', label: 'NOK - Norwegian Krone'},
                        {value: 'MXN', label: 'MXN - Mexican Peso'},
                        {value: 'GHS', label: 'GHS - Ghanaian Cedi'},
                        {value: 'NGN', label: 'NGN - Nigerian Naira'},
                    ]}
                />

                <Input type="dropdown" label='To' value={toCurrency} onChange={setToCurrency}
                       options={[
                        {value: 'BTC', label: 'Bitcoin (BTC)'},
                        {value: 'ETH', label: 'Ethereum (ETH)'},
                        {value: 'USDT', label: 'Tether (USDT)'},
                        {value: 'BNB', label: 'Binance Coin (BNB)'},
                        {value: 'USDC', label: 'USD Coin (USDC)'},
                        {value: 'XRP', label: 'XRP (XRP)'},
                        {value: 'BUSD', label: 'Binance USD (BUSD)'},
                        {value: 'ADA', label: 'Cardano (ADA)'},
                        {value: 'DOGE', label: 'Dogecoin (DOGE)'},
                        {value: 'MATIC', label: 'Polygon (MATIC)'},
                        {value: 'SOL', label: 'Solana (SOL)'},
                        {value: 'DOT', label: 'Polkadot (DOT)'},
                        {value: 'SHIB', label: 'Shiba Inu (SHIB)'},
                        {value: 'LTC', label: 'Litecoin (LTC)'},
                        {value: 'TRX', label: 'Tron (TRX)'},
                        {value: 'AVAX', label: 'Avalanche (AVAX)'},
                       ]}
                />

            </div>

            <Input type="number"  label='Amount' defaultValue={1} min={0}  onChange={(value) => {setAmount(value || 1)  }}/>

            <p id="result" style={ !(error) ? {height: "25px", fontWeight:'bold'} : {height: "25px", color: 'red'}}>
                {!error ? result : error}
            </p>

            <Input type="button" value="Convert" onClick={handleConvert} />
        </div>
    );
};

export default CurrencyConverter;
