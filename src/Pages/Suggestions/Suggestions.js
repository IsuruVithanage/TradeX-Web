import React, {useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import NumberInput from "../../Components/Input/NumberInput/NumberInput";
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import Table, {TableRow} from "../../Components/Table/Table";
import assets from "../Portfolio/assets.json";
import initialData from "../Portfolio/portfolio-data.json";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";

export default function Suggestions() {
    const Tabs = [
        {label: "Suggestions", path: "/suggestion"},
    ];

    const [coinData, setcoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });


    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    const formatCurrency = (amount) => {
        const amountString = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20
        });
        return '$ ' + amountString;
    };

    function handleRowClick(coin) {
        console.log(coin);
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${coin}`
            )
            .then(res => {
                setcoinData((prevData) => ({
                    ...prevData,
                    name: res.data.name,
                    price: formatCurrency(res.data.market_data.current_price.usd),
                    symbol: res.data.image.large,
                    priceChange: res.data.market_data.price_change_24h,
                    marketcap: res.data.market_data.market_cap.usd,
                }));
                console.log(res.data);
            })
            .catch(error => console.log(error));


    }

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{height: '530px', padding: "22px"}}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Trade</h1>


                    </div>
                }
            >

                <div className='coinDiv'>
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
                </div>
                <LineChart data={initialData}></LineChart>
            </SidePanelWithContainer>

            <Table style={{marginTop: '1vh'}}>
                <TableRow data={[
                    'Coin',
                    'Date',
                    'Type',
                    'Price',
                    'Quantity',
                    'Value',
                    'PNL'
                ]}/>


                {assets && Object.keys(assets).slice(1).map(coin => (
                    <TableRow
                        key={coin}
                        data={[
                            [coin],
                            assets[coin].spotBalance,
                            assets[coin].fundingBalance,
                            assets[coin].TotalBalance,
                            assets[coin].marketPrice,
                        ]}
                        onClick={() => handleRowClick(assets[coin].name)}
                    />
                ))}
            </Table>
        </BasicPage>
    )


}