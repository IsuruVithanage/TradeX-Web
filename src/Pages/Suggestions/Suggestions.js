import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import Table, {TableRow, Coin} from "../../Components/Table/Table";
import assets from "../SimulateTradingPlatform/assets.json";
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
    const [tradeData, setTradeData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    const loadOrderHistory = async () => {
        try {
            const res = await axios.get(
                'http://localhost:8005/order/getAllOrders'
            );
            setOrderHistory(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadOrderHistory();
    }, []);

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
                `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`
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

    function handleRowClick() {

        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/bitcoin`
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
                console.log(coinData);
                await fetchData();//load chart data
                console.log(tradeData);
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
                <TableRow data={[
                    'Coin',
                    'Date',
                    'Type',
                    'Price',
                    'Quantity',
                    'Total Price',
                ]}/>


                {orderHistory .map(order => (
                    <TableRow
                        data={[
                            <Coin>{order.coin}</Coin>,
                            new Date(order.date).toLocaleDateString(),
                            order.type,
                            order.price,
                            order.quantity,
                            order.totalPrice,
                        ]}
                        onClick={() => handleRowClick(assets[order.coin].name)}
                    />
                ))}
            </Table>
        </BasicPage>
    )


}