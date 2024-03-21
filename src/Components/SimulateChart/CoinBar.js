import React, {useEffect, useState} from 'react';
import './CoinBar.css';
import Modal from "../Modal/Modal";
import Table, {TableRow} from "../Table/Table";
import axios from "axios";

const CoinBar = ({ onSelectCoin, enableModel }) => {
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
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
            )
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
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
            name: selectedCoin.name,
            price: formatCurrency(selectedCoin.current_price),
            symbol: selectedCoin.image,
            priceChange: selectedCoin.price_change_percentage_24h,
            marketcap: formatCurrency(selectedCoin.market_cap),
        }));
        setIsSetterModalOpen(false);
        onSelectCoin(selectedCoin);
        setIsCoinSelected(true);

    };



    const formatCurrency = (amount) => {
        const amountString = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20
        });
        return '$ ' + amountString;
    };


    return (

        <div className='coinDiv' onClick={openSetterModel} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {isCoinSelected ? (
                <>
                    <div className='coin-logo'>
                        <div className='coin-logo coinimg'>
                            <img src={coinData.symbol} alt=""/>
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
                                        key={coin.id}
                                        data={[
                                            <img className='coin-image' src={coin.image} alt={coin.symbol} />,
                                            coin.name,
                                            formatCurrency(coin.current_price),
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