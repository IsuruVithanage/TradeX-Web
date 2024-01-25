import React, { useState } from 'react';
import './CoinBar.css';

const CoinBar = () => {
    const [bitcoinData, setBitcoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });

    return (
        <div className='coinDiv'>
            <div className='coin-logo'>
                <div className='coin-logo coin'>
                    <img src="" alt=""/>
                    <p>BTC</p>
                </div>
            </div>
            <div className='coinData'>
                <div className='cdata'>
                    <h1>Price</h1>
                    <p>20000</p>
                </div>
                <div className='cdata'>
                    <h1>24h Change</h1>
                    <p>20000</p>
                </div>
                <div className='cdata'>
                    <h1>Market Cap</h1>
                    <p>20000</p>
                </div>
            </div>
        </div>
    );
};

export default CoinBar;
