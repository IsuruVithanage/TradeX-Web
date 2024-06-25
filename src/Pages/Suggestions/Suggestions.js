import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import Table, {Coin, TableRow} from "../../Components/Table/Table";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";
import Input from "../../Components/Input/Input";
import './Suggstions.css';
import {Spin} from "antd";
import symbols from "../../Assets/Images/Coin Images.json";
import {showMessage} from "../../Components/Message/Message";
import {LuRefreshCw} from "react-icons/lu";
import {useAuthInterceptor} from "../../Authentication/axiosInstance";
import {getUser} from "../../Storage/SecureLs";

export default function Suggestions() {
    const axiosInstance = useAuthInterceptor();

    const Tabs = [
        {label: "Suggestions", path: "/suggestion"},
    ];

    const user = getUser();

    useEffect(() => {
        console.log('User:', user);
    }, []);

    const [coinData, setCoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });

    const [type, setType] = useState('Buy');

    const [geminiData, setGeminiData] = useState({
        coinName: '',
        tradePrice: 0,
        quantity: 0,
        orderType: type,
        boughtPrice: 0,
        orderCategory: '',
        tradingData: []
    });

    const [tradeData, setTradeData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [suggestion, setSuggestion] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const filterBtn = ["All", "Today", "Week", "Month"];
    const [activateDuration, setActivateDuration] = useState("All");
    const [filteredOrderHistory, setFilteredOrderHistory] = useState([]);


    const loadOrderHistory = async () => {
        try {
            const res = await axiosInstance.get(
                `/order/getAllOrdersByIdAndCato/${type}/${user.id}`
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
            await processAnalyzeData(res.data, order);
        } catch (error) {
            console.log(error);
        }
    };


    const processAnalyzeData = async (newData, order) => {
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
                quantity: order.quantity,
                orderType: order.type,
                boughtPrice: type === "Sell" ? getBoughtPrice(selectedOrder.coin) : 0,
                orderCategory: order.category,
                tradingData: transformedData.slice(0, 250)
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("Gemini Data", geminiData);
        getSuggestions();
    }, [geminiData]);

    const getBoughtPrice = async (coin) => {
        fetch(`http://localhost:8011/portfolio/asset/${user.user.id}/${coin === '$' ? 'USD' : coin}`)
            .then(response => response.json())
            .then(data => {
                console.log('Wallet balance:', data[0]);
                return data[0].avgPurchasePrice;
            })
            .catch(error => {
                console.error('Failed to get wallet balance:', error);
            });
    }

    const getSuggestions = async () => {
        console.log('getSuggestions');
        setSuggestion(null);
        setLoading(true);
        setError(false);

        if (geminiData.tradingData.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const res = await axiosInstance.post(`/suggestion/buyOrderSuggestion`, geminiData,);
            const data = res.data;
            console.log(data);
            setSuggestion(data);
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("suggest", suggestion);
    }, [suggestion]);


    useEffect(() => {
        loadOrderHistory();
    }, [type]);

    const fetchChartData = async (startTime, endTime, coin) => {
        try {
            setIsLoading(true);
            const min = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=1m&startTime=${startTime}&endTime=${endTime}&limit=500`
            );
            const minData = min.data.map((item) => ({
                time: (item[0] / 1000),
                value: parseFloat(item[4]),
            }));
            const result = {'1M': {showTime: true, data: minData}};
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

    useEffect(() => {
        filterOrders();
    }, [orderHistory, activateDuration]);

    const filterOrders = () => {
        const now = new Date();
        let filteredOrders;

        switch (activateDuration) {
            case "Today":
                filteredOrders = orderHistory.filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.toDateString() === now.toDateString();
                });
                break;
            case "Week":
                filteredOrders = orderHistory.filter(order => {
                    const orderDate = new Date(order.date);
                    const weekAgo = new Date(now);
                    weekAgo.setDate(now.getDate() - 7);
                    return orderDate >= weekAgo && orderDate <= now;
                });
                break;
            case "Month":
                filteredOrders = orderHistory.filter(order => {
                    const orderDate = new Date(order.date);
                    const monthAgo = new Date(now);
                    monthAgo.setMonth(now.getMonth() - 1);
                    return orderDate >= monthAgo && orderDate <= now;
                });
                break;
            default:
                filteredOrders = orderHistory;
                break;
        }

        setFilteredOrderHistory(filteredOrders);
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
                style={{height: '91vh', padding: '1.7rem', overflowY: 'auto'}}
                className="side-panel-container"
                line={false}
                sidePanel={
                    <div className="side-panel-container">
                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <h1 style={{fontSize: '1.5rem'}}>Suggestions</h1>
                            {suggestion && (
                                <LuRefreshCw style={{
                                    color: '#21DB9A',
                                    fontSize: '1.6rem',
                                    marginLeft: '6rem',
                                    marginTop: "0.3rem",
                                    cursor: 'pointer'
                                }}
                                             onClick={getSuggestions}
                                />
                            )}
                        </div>
                        {loading ? (
                            <div style={{textAlign: 'center', paddingTop: '50px'}}>
                                <Spin size="large"/>
                            </div>
                        ) : error ? (
                            <div style={{textAlign: 'center', paddingTop: '50px'}}>
                                <p className='error-message'>Failed to load suggestions.</p>
                                <Input type="button" value='Try Again' onClick={getSuggestions}
                                       style={{width: '150px'}}/>
                            </div>
                        ) : suggestion && Array.isArray(suggestion.suggestions) && Array.isArray(suggestion.resources) ? (
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
                                    {Array.isArray(suggestion.suggestions) && (
                                        <ul className='s-data'>
                                            {suggestion.suggestions.map((item, index) => (
                                                <li key={index} style={{marginBottom: '10px'}}>{"• " + item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <p className='s-lables'>Resources</p>
                                    {Array.isArray(suggestion.resources) && (
                                        <ul className='s-data'>
                                            {suggestion.resources.map((item, index) => (
                                                <li key={index} style={{
                                                    marginBottom: '10px',
                                                    fontWeight: 'normal',
                                                    color: '#21DB9A'
                                                }}>
                                                    <a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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


                <LineChart
                    zoom={true}
                    data={tradeData}
                    title={selectedOrder ? selectedOrder.coin : null}
                    suggestPrice={suggestion ? formatCurrency(suggestion.bestPrice) : null}
                    orderPrice={selectedOrder ? formatCurrency(selectedOrder.price) : null}
                    suggestMarkerTime={suggestion ? suggestion.time / 1000 : null}
                    currentMarkerTime={selectedOrder ? selectedOrder.time / 1000 : null}
                    style={{height: '35rem', flex: 'none'}}>
                </LineChart>


                <Table
                    style={{marginTop: '1vh'}}
                    emptyMessage={"No Trade data To display"}
                    hover={true}
                    restart={filteredOrderHistory}
                    tableTop={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            marginTop: '0.7rem'
                        }}>
                            <div style={{width: '10rem'}}>
                                <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                {
                                    filterBtn.map((duration, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                filterOrders();
                                                setActivateDuration(duration)
                                            }}
                                            className={`duration-button ${activateDuration === duration ? "active" : ""}`}>
                                            {duration}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                    }>


                    <TableRow data={[
                        'Coin',
                        'Date',
                        'Type',
                        'Category',
                        'Price',
                        'Quantity',
                        'Total Price',
                    ]}/>

                    {filteredOrderHistory
                        .filter(order => order.category !== 'Limit' || (order.category === 'Limit' && order.orderStatus === 'Completed'))
                        .map(order => (
                            <TableRow
                                key={order.orderId}
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