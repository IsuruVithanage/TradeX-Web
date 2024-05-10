import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import Table, {Coin, TableRow} from "../../Components/Table/Table";
import assets from "../SimulateTradingPlatform/assets.json";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";
import Input from "../../Components/Input/Input";

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

    const [geminiData, setGeminiData] = useState({
        coinName: '',
        tradePrice: 0,
        tradingData: []
    });


    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [selectedCoin, setSelectedCoin] = useState(null);
    const [type, settType] = useState('Buy');
    const [tradeData, setTradeData] = useState([]);
    const [analyzeData, setAnalyzeData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [suggestion, setSuggestion] = useState(null);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    const loadOrderHistory = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8005/order/getOrderByCato/${type}`
            );
            setOrderHistory(res.data);
            console.log(res.data);

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
                time: item[0] / 1000,
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
        if (suggestion !== null) {
            return;
        }
        try {
            const res = await fetch('http://localhost:8005/suggestion/buyOrderSuggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(suggestion)
            })

            setSuggestion(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchAnalyzeData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${
                    coinData === null ? 'BTC' : coinData.symbol.toUpperCase()
                }USDT&interval=1m&limit=1000`
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

    const processData = async (newData) => {
        try {
            let seen = new Set();
            const filteredData = newData.filter((item) => {
                const date = new Date(item[0] * 1000);
                const year = 2024;
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
                const day = String(date.getUTCDate()).padStart(2, '0');
                const time = `${year}-${month}-${day}`;

                if (seen.has(time)) {
                    return false;
                } else {
                    seen.add(time);
                    return true;
                }
            });

            const transformedData = filteredData.map((item) => {
                const date = new Date(item[0] * 1000);
                const year = 2024;
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
                const day = String(date.getUTCDate()).padStart(2, '0');

                return {
                    time: `${year}-${month}-${day}`,
                    value: parseFloat(item[4]),
                };
            });

            transformedData.sort((a, b) => a.time.localeCompare(b.time));
            console.log(transformedData);

            const result = {
                Day: transformedData
            };

            setTradeData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        console.log(coinData.symbol);
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${coinData.symbol.toUpperCase()}USDT&interval=1m&limit=1000`
            );
            return processData(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const formatCurrency = (amount) => {
        const amountString = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20
        });
        return '$ ' + amountString;
    };

    function handleRowClick(order) {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${assets[order.coin].name}`
            )
            .then(async res => {
                setcoinData((prevData) => ({
                    ...prevData,
                    name: res.data.name,
                    price: formatCurrency(res.data.market_data.current_price.usd),
                    symbol: res.data.symbol,
                    image: res.data.image.large,
                    priceChange: res.data.market_data.price_change_24h,
                    marketcap: res.data.market_data.market_cap.usd,
                }));

                setGeminiData((prevData) => ({
                    ...prevData,
                    coinName: assets[order.coin].name,
                    tradePrice: order.price
                }));
                await fetchData();
                await fetchAnalyzeData();
                let index = binarySearchByTime(order.time);
                getSurroundingElements(index);
                await getSuggestions();
            })
            .catch(error => console.log(error));


    }

    useEffect(() => {
        console.log("Gemini Data", geminiData);
    }, [geminiData]);

    const setOrderType = (type) => {
        settType(type);
    };
    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{height: '530px', padding: "22px"}}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Suggetion</h1>
                        <p>Coin ${}</p>


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
                <LineChart data={tradeData} isSugges={true}></LineChart>
            </SidePanelWithContainer>

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
        </BasicPage>
    )


}