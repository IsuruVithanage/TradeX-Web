import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import assets from "../SimulateTradingPlatform/assets.json";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";
import Converter from "../../Components/Converter/Converter";
import CoinDescriptions from "../../Assets/Images/Coin Description.json";

export default function CoinPage() {
    const Tabs = [{ label: "CoinPage", path: "/watchlist/CoinPage" }];

    const [coinData, setCoinData] = useState({
        name: "",
        price: 0,
        symbol: "",
        marketcap: 0,
        volume: 0,
        image: "",
        priceChange: 0,
    });

    const priceLimits = ["Limit", "Market", "Stop Limit"];
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [tradeData, setTradeData] = useState([]);
    const [coinDescription, setCoinDescription] = useState(""); // Changed state name to singular

    const [isLoading, setIsLoading] = useState(false);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    useEffect(() => {
        loadCoinData();
    }, []);

    useEffect(() => {
        fetchData();
        loadCoinDescriptions();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`
            );
            processData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const processData = async (newData) => {
        try {
            let seen = new Set();
            const filteredData = newData.filter((item) => {
                const date = new Date(item[0] * 1000);
                const year = 2024;
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const day = String(date.getUTCDate()).padStart(2, "0");
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
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const day = String(date.getUTCDate()).padStart(2, "0");

                return {
                    time: `${year}-${month}-${day}`,
                    value: parseFloat(item[4]),
                };
            });

            transformedData.sort((a, b) => a.time.localeCompare(b.time));

            const result = {
                Day: transformedData,
            };

            setTradeData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const loadCoinDescriptions = () => {
        // Load coin descriptions from JSON file
        setCoinDescription(CoinDescriptions.coins["BTC"].description); // Accessing only Bitcoin description
    };

    const formatCurrency = (amount) => {
        // Format currency as needed
        const amountString = amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20,
        });
        return "$ " + amountString;
    };

    function loadCoinData() {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/bitcoin`)
            .then(async (res) => {
                setCoinData((prevData) => ({
                    ...prevData,
                    name: res.data.name,
                    price: formatCurrency(res.data.market_data.current_price.usd),
                    symbol: res.data.symbol,
                    image: res.data.image.large,
                    priceChange: res.data.market_data.price_change_24h,
                    marketcap: res.data.market_data.market_cap.usd,
                }));
                await fetchData();
            })
            .catch((error) => console.log(error));
    }

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{ height: "530px", padding: "22px" }}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Crypto Converter</h1>
                        <Converter />
                    </div>
                }
            >
                <div className="coinDiv">
                    <div className="coin-logo">
                        <div className="coin-logo coinimg">
                            <img src={coinData.image} alt="" />
                            <p>{coinData.name}</p>
                        </div>
                    </div>
                    <div className="coinData">
                        <div className="cdata">
                            <h1>Price</h1>
                            <p>{coinData.price}</p>
                        </div>
                        <div className="cdata">
                            <h1>24h Price Change</h1>
                            <p
                                style={{
                                    color: coinData.priceChange > 0 ? "#21DB9A" : "#FF0000",
                                }}
                            >
                                {coinData.priceChange} %
                            </p>
                        </div>
                        <div className="cdata">
                            <h1>Market Cap</h1>
                            <p>{coinData.marketcap}</p>
                        </div>
                    </div>
                </div>
                <div className="coinDiv">
                    <div>
                         <p>{isLoading ? "Loading..." : coinDescription}</p> Display Bitcoin description
                    </div>
                </div>
                <LineChart data={tradeData} isSugges={true}></LineChart>
            </SidePanelWithContainer>
        </BasicPage>
    );
}