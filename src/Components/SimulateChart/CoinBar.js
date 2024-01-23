import React, { useState, useEffect } from 'react';
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
        <div id='coinDiv'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={bitcoinData.image} alt='crypto' />
                    <h1>{bitcoinData.name}</h1>
                    <p className='coin-symbol'>{bitcoinData.symbol}</p>
                </div>
                <div className='coin-data'>
                    <p className='coin-price'>${bitcoinData.price}</p>
                    <p className='coin-volume'>${bitcoinData.volume.toLocaleString()}</p>

                    {bitcoinData.priceChange < 0 ? (
                        <p className='coin-percent red'>
                            {bitcoinData.priceChange.toFixed(2)}%
                        </p>
                    ) : (
                        <p className='coin-percent green'>
                            {bitcoinData.priceChange.toFixed(2)}%
                        </p>
                    )}

                    <p className='coin-marketcap'>
                        Mkt Cap: ${bitcoinData.marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CoinBar;
