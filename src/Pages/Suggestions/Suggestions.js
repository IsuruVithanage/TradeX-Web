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
import {showMessage} from "../../Components/Message/Message";

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
            setSelectedOrder(res.data[0]);
            await handleRowClick(res.data[0]);

        } catch (error) {
            console.log(error);
            showMessage('error', 'Error', 'Error fetching order history');
        }
    };

    const fetchAnalyzeData = async (order) => {
        try {
            const orderTime = new Date(order.time / 1);
            const startTime = orderTime.getTime() - 15 * 60 * 1000;
            const endTime = orderTime.getTime() + 15 * 60 * 1000;
            const res = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${order.coin}USDT&startTime=${startTime}&endTime=${endTime}&interval=1m&limit=500`);
            await processAnalyzeData(res.data,order);
        } catch (error) {
            console.log(error);
        }
    };


    const processAnalyzeData = async (newData,order) => {
        try {
            const transformedData = newData.map((item) => ({
                open: parseFloat(item[1]),
                high: parseFloat(item[2]),
                low: parseFloat(item[3]),
                close: parseFloat(item[4]),
                time: item[0],
            }));

            transformedData.sort((a, b) => a.time - b.time);
            console.log('Transformed Data:', transformedData);
            setGeminiData((prevData) => ({
                ...prevData,
                coinName: symbols[order.coin].name,
                tradePrice: order.price,
                quantity:order.quantity,
                tradingData: transformedData.slice(0, 50)
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("Gemini Data", geminiData);
        getSuggestions();
    }, [geminiData]);

    const getSuggestions = async () => {
        console.log('getSuggestions');
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('http://localhost:8005/suggestion/buyOrderSuggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiData),
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            const formatText = (text) => text.split('\n').map(line => line.replace(/^- /, '• ')).join('\n');
            const formattedData = { ...data, suggestions: formatText(data.suggestions), advices: formatText(data.advices) };
            setSuggestion(formattedData);
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadOrderHistory();
    }, [type]);

    const fetchChartData = async (startTime, endTime, coin) => {
        try {
            setIsLoading(true);
            const min = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=1m&startTime=${startTime}&endTime=${endTime}&limit=500`
            );
            const timeZone = new Date().getTimezoneOffset() * 60;
            const minData = min.data.map((item) => ({
                time: (item[0] / 1000) - timeZone,
                value: parseFloat(item[4]),
            }));
            const result = { '1M': { showTime: true, data: minData } };
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
        const timeZone = new Date().getTimezoneOffset() * 60;

        const date = (timestamp / 1000) - timeZone;

        console.log(date);
        return date;
    }

    const getCoin = async (coin) => {
        try {
            const res = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coin}USDT`);
            const data = res.data;
            setCoinData((prevData) => ({
                ...prevData,
                name: symbols[coin].name,
                price: formatCurrency(data.lastPrice),
                symbol: coin,
                priceChange: data.priceChange,
                marketcap: formatCurrency(data.quoteVolume),
                image: symbols[coin].img,
            }));
        } catch (error) {
            showMessage('error', 'Error', 'Error fetching coin data');
        }
    };


    const handleRowClick = async (order) => {
        try {
            setSelectedOrder(order);
            setSuggestion(null);
            setLoading(true);
            setError(false);
            const coin = order.coin;
            await getCoin(coin);

            const orderTime = new Date(order.time / 1);
            const threeHoursBefore = orderTime.getTime() - 3 * 60 * 60 * 1000;
            const threeHoursAfter = orderTime.getTime() + 3 * 60 * 60 * 1000;

            await fetchChartData(threeHoursBefore, threeHoursAfter, coin);
            await fetchAnalyzeData(order);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    };

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
                                <p className='error-message'>Something wend wrong. Please try again.</p>
                                <Input type="button" value='Try Again' onClick={getSuggestions}
                                       style={{width: '150px'}}/>
                            </div>
                        ) : suggestion ? (
                            <div>
                                <div style={{display: 'flex'}}>
                                    <div>
                                        <p className='s-lables'>Best Price</p>
                                        <p className='s-data' style={{
                                            fontSize: '1.5rem',
                                            color: '#21DB9A',
                                            marginRight: '0.5rem',
                                            fontWeight: 'bold'
                                        }}>{formatCurrency(suggestion.bestPrice)}</p>
                                    </div>
                                    <div>
                                        <p className='s-lables'>Profit</p>
                                        <p className='s-data' style={{
                                            fontSize: '1.5rem',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}>{formatCurrency(suggestion.profitFromBestPrice)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='s-lables'>Suggestions</p>
                                    <ul className='s-data'>
                                        {suggestion.suggestions.split('\n').map((item, index) => (
                                            <li key={index} style={{marginBottom: '10px'}}>{item}</li>
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
                                <p className='error-message'>No suggestions available.</p>
                            </div>
                        )}
                    </div>
                }
            >

                <div className='coinDiv' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {selectedOrder ? (
                        <>
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
                                    <h1>{selectedOrder ? (selectedOrder.type === 'Buy' ? 'Purchased Price' : 'Sold Price') : 'Quantity'}</h1>
                                    <p style={{color: '#ffb521'}}>{formatCurrency(selectedOrder.price)}</p>
                                </div>
                                <div className='cdata'>
                                    <h1>Quantity</h1>
                                    <p>{selectedOrder.quantity}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1 style={{
                            fontSize: '1rem',
                            alignItems: 'center',
                            justifyItems: 'center',
                            color: '#5a5a5a'
                        }}>No data selected</h1>
                    )}
                </div>


                <LineChart data={tradeData}
                           suggestion={suggestion ? suggestion : null}
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
