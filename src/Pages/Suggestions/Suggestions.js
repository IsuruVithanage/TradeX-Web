import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import Table, {Coin, TableRow} from "../../Components/Table/Table";
import assets from "../SimulateTradingPlatform/assets.json";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";
import Input from "../../Components/Input/Input";
import './Suggstions.css';
import {Spin, Button} from "antd";
import symbols from "../../Assets/Images/Coin Images.json";

export default function Suggestions() {
    const Tabs = [
        {label: "Suggestions", path: "/suggestion"},
    ];

    const [coinData, setCoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });

    const [geminiData, setGeminiData] = useState({
        coinName: '',
        tradePrice: 0,
        tradingData: []
    });

    const [type, setType] = useState('Buy');
    const [tradeData, setTradeData] = useState([]);
    const [analyzeData, setAnalyzeData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [suggestion, setSuggestion] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const loadOrderHistory = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8005/order/getOrderByCato/${type}`
            );
            setOrderHistory(res.data);
            console.log("order", res);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("Analyze Data", analyzeData);
    }, [analyzeData]);


    const processAnalyzeData = async (newData) => {
        try {
            const transformedData = newData.map((item) => ({
                open: parseFloat(item[1]),
                high: parseFloat(item[2]),
                low: parseFloat(item[3]),
                close: parseFloat(item[4]),
                time: item[0],
            }));

            transformedData.sort((a, b) => a.time - b.time);

            setAnalyzeData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function binarySearchByTime(targetTime) {
        console.log(targetTime)
        let left = 0;
        let right = analyzeData.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midTime = analyzeData[mid].time;

            if (midTime === parseFloat(targetTime)) {
                return mid; // Return the index if found
            } else if (midTime < parseFloat(targetTime)) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1; // Return -1 if not found
    }

    function getSurroundingElements(targetIndex) {
        console.log(assets[orderHistory[0].coin].name);
        const numBefore = 5;
        const numAfter = 5;
        const startIndex = Math.max(0, targetIndex - numBefore);
        const endIndex = Math.min(analyzeData.length - 1, targetIndex + numAfter);

        setGeminiData((prevData) => ({
            ...prevData,
            tradingData: analyzeData.slice(startIndex, endIndex + 1)
        }));

    }

    const getSuggestions = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('http://localhost:8005/suggestion/buyOrderSuggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(geminiData)
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log('Response data:', data);
            // Format suggestions and advices
            const formatText = (text) => {
                return text.split('\n').map(line => line.replace(/^- /, '• ')).join('\n');
            };

            const formattedData = {
                ...data,
                suggestions: formatText(data.suggestions),
                advices: formatText(data.advices)
            };

            setSuggestion(formattedData);
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const fetchAnalyzeData = async (coinSymbol) => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${coinSymbol}USDT&interval=1m&limit=1000`
            );

            console.log(res.data);
            await processAnalyzeData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadOrderHistory();
    }, [type]);

    const fetchChartData = async (coin) => {
        try {
            setIsLoading(true);

            const min = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=1m&limit=180`
            );


            const timeZone = new Date().getTimezoneOffset() * 60;

            const minData = min.data.map((item) => ({
                time: (item[0] / 1000) - timeZone,
                value: parseFloat(item[4]),
            }));


            const result = {
                '1M': {
                    showTime: true,
                    data: minData
                },

            };

            setTradeData(result);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        const amountString = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20
        });
        return '$ ' + amountString;
    };

    function convertTimestampToDateObject(timestamp) {
        // Create a new Date object using the timestamp
        console.log(1715806140000);
        const timeZone = new Date().getTimezoneOffset() * 60;

        const date = (timestamp / 1000) - timeZone;

        // Return the object
        console.log(date);
        return date;
    }


    const handleRowClick = async (order) => {
        try {
            setSelectedOrder(order);
            console.log("Order", order);
            setSuggestion(null);
            setLoading(true);
            setError(false);
            const coin = order.coin;

            const res = await axios.get(
                `https://api.binance.com/api/v3/ticker/24hr?symbols=["${coin}USDT"]`
            );

            console.log("suuu", res.data);

            setCoinData((prevData) => ({
                ...prevData,
                name: symbols[coin].name,
                price: formatCurrency(res.data[0].lastPrice),
                symbol: coin,
                image: symbols[coin].img,
                priceChange: res.data[0].priceChangePercent,
                marketcap: res.data[0].volume,
            }));

            setGeminiData((prevData) => ({
                ...prevData,
                coinName: assets[order.coin].name,
                tradePrice: order.price
            }));

            // Fetch data for the selected coin
            await fetchChartData(coin);
            await fetchAnalyzeData(coin);
            const index = binarySearchByTime(order.time);
            getSurroundingElements(index);
            await getSuggestions();
        } catch (error) {
            console.error(error);
            setLoading(false); // Ensure loading is stopped even on error
            setError(true); // Set error state
        }
    };

    useEffect(() => {
        console.log("Gemini Data", geminiData);
    }, [geminiData]);

    const setOrderType = (type) => {
        setType(type);
    };


    return (
        <BasicPage
            headerProps={{
                tabs: Tabs,
                titleType: 'primary',
                title: "Trade Suggestions"
            }}
            isLoading={isLoading}
        >
            <SidePanelWithContainer

                header={'Suggestions'}
                sidePanel={

                    <div style={{height: '91vh', overflowY: 'auto'}}>


                        {loading ? (
                            <div style={{textAlign: 'center', paddingTop: '50px'}}>
                                <Spin size="large"/>
                            </div>
                        ) : error ? (
                            <div style={{textAlign: 'center', paddingTop: '50px'}}>
                                <p>Error fetching suggestions. Please try again.</p>
                                <Button onClick={getSuggestions}>Try Again</Button>
                            </div>
                        ) : suggestion ? (
                            <div>
                                <div style={{display: 'flex'}}>
                                    <div>
                                        <p className='s-lables'>Best Price</p>
                                        <p className='s-data' style={{
                                            fontSize: '1.5rem',
                                            color: '#21DB9A',
                                            marginRight: '0.5rem'
                                        }}>{formatCurrency(suggestion.bestPrice)}</p>
                                    </div>
                                    <div>
                                        <p className='s-lables'>Profit</p>
                                        <p className='s-data' style={{
                                            fontSize: '1.5rem',
                                            color: 'red'
                                        }}>{formatCurrency(suggestion.profitFromBestPrice)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='s-lables'>Suggestions</p>
                                    <ul className='s-data'>
                                        {suggestion.suggestions.split('\n').map((item, index) => (
                                            <li key={index} style={{marginBottom:'10px'}}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className='s-lables'>Advices</p>
                                    <ul className='s-data'>
                                        {suggestion.advices.split('\n').map((item, index) => (
                                            <li key={index} style={{marginBottom: '10px'}}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div style={{textAlign: 'center', paddingTop: '50px'}}>
                                <p>No suggestions available.</p>
                            </div>
                        )}
                    </div>
                }
            >
                <div className='coinDiv'>
                    <div className='coin-logo'>
                        <div className='coin-logo coinimg'>
                            <img src={coinData.image} alt=""/>
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

                <LineChart data={tradeData}
                           markerTime={selectedOrder ? convertTimestampToDateObject(selectedOrder.time) : null}
                           isSugges={true} style={{height: '35rem', flex: 'none'}}></LineChart>


                <Table style={{marginTop: '1vh'}} hover={true}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
                        <div style={{width: '10rem'}}>
                            <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>
                        </div>
                    </div>

                    <TableRow data={[
                        'Coin',
                        'Date',
                        'Type',
                        'Category',
                        'Price',
                        'Quantity',
                        'Total Price',
                    ]}/>

                    {orderHistory.map(order => (
                        <TableRow
                            key={order.id} // Ensure each row has a unique key
                            data={[
                                <Coin>{order.coin}</Coin>,
                                new Date(order.date).toLocaleDateString(),
                                order.type,
                                order.price,
                                order.category,
                                order.quantity,
                                order.totalPrice,
                            ]}
                            onClick={() => handleRowClick(order)}
                        />
                    ))}
                </Table>

            </SidePanelWithContainer>


        </BasicPage>
    );
}
