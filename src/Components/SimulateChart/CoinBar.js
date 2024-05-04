import React, {useEffect, useState} from 'react';
import './CoinBar.css';
import Modal from "../Modal/Modal";
import Table, {TableRow} from "../Table/Table";
import axios from "axios";
import symbols from "../../Assets/Images/Coin Images.json";

const CoinBar = ({ onSelectCoin, enableModel, selectedCoin }) => {
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [coins, setCoins] = useState([]);
    const [isCoinSelected, setIsCoinSelected] = useState(false);
    const [coinData, setcoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });

    useEffect(() => {
        console.log('coin',selectedCoin);
        if (selectedCoin) {
            handleRowClick(selectedCoin)
        }
    }, [selectedCoin]);

    useEffect(() => {
        axios
            .get(
                `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols.coinsList}`
            )
            .then((res) => {
                console.log(res.data);
                const data = res.data.map((coin) => {
                    coin.symbol = coin.symbol.slice(0, -4);
                    return coin;
                }).sort((a, b) => b.quoteVolume - a.quoteVolume);


                setCoins(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const openSetterModel = () => {
        if (isSetterModalOpen) {
            setIsSetterModalOpen(false);
        } else {
            setIsSetterModalOpen(true)
        }

    }

    const handleRowClick = (selectedCoin) => {
        setcoinData((prevData) => ({
            ...prevData,
            name: symbols[selectedCoin.symbol].name,
            price: formatCurrency(selectedCoin.lastPrice),
            symbol: selectedCoin.symbol,
            priceChange: selectedCoin.priceChange,
            marketcap: formatCurrency(selectedCoin.quoteVolume),
        }));
        setIsSetterModalOpen(false);
        onSelectCoin(selectedCoin);
        setIsCoinSelected(true);

    };



    const formatCurrency = (amount) => {
        const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (!isNaN(parsedAmount)) {
            const amountString = parsedAmount.toFixed(2);
            return '$ ' + amountString;
        } else {
            return 'Invalid amount';
        }
    };



    return (

        <div className='coinDiv' onClick={openSetterModel} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {isCoinSelected ? (
                <>
                    <div className='coin-logo'>
                        <div className='coin-logo coinimg'>
                            <img src={symbols[coinData.symbol].img} alt=""/>
                            <p>{coinData.name}</p>
                        </div>
                    </div>
                    <div className='coinData'>
                        <div className='cdata'>
                            <h1>Price</h1>
                            <p>{coinData.price}</p>
                        </div>
                        <div className='cdata'>
                            <h1>24h Price Change</h1>
                            <p style={{color: coinData.priceChange > 0 ? "#21DB9A" : "#FF0000"}}>{coinData.priceChange} %</p>
                        </div>
                        <div className='cdata'>
                            <h1>Market Cap</h1>
                            <p>{coinData.marketcap}</p>
                        </div>
                    </div>
                </>
            ) : (
                <h1 style={{fontSize:'1.2rem',alignItems:'center',justifyItems:'center',color:'#9E9E9E'}}>Select a Coin</h1>
            )}

            {enableModel && (
                <Modal open={isSetterModalOpen} close={() => setIsSetterModalOpen(false)}>
                    <div style={{ width: '450px' }}>
                        <div style={{ width: '100%', marginBottom: '50px' }}>
                            <h1 style={{ textAlign: 'center' }}>Select Coin</h1>
                            <Table style={{ marginTop: '1vh' }}>
                                <TableRow data={['', 'Coin', 'Price']}/>

                                {coins.map((coin) => (
                                    <TableRow
                                        key={coin.symbol}
                                        data={[
                                            <img className='coin-image' src={symbols[coin.symbol].img} alt={coin.symbol} />,
                                            symbols[coin.symbol].name,
                                            formatCurrency(coin.lastPrice),
                                        ]}
                                        onClick={() => handleRowClick(coin)}
                                    />
                                ))}
                            </Table>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoinBar;