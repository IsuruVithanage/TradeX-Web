import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import "./Watchlist.css";

const Watchlist = () => {
    const symbols = require("../../Assets/Images/Coin Images.json");
    const symbolsList = '["' + Object.keys(symbols).slice(1).map((symbol) => `${symbol}USDT`).join('","') + '"]';
    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setIsLoading(true);
        console.log(symbolsList);

        axios
        .get(
            // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
            `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsList}`
        )
        .then((res) => {
            const data = res.data.map((coin) => {
                coin.symbol = coin.symbol.slice(0, -4);
                return coin;
            }).sort((a, b) => b.quoteVolume - a.quoteVolume);


            setCoins(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }, [symbolsList]);


    const formatCurrency = (amount) => {
        const amountString = parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 20,
        });
        return "$ " + amountString;
    };


    const filteredCoins = coins.filter((coin) =>
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <BasicPage
            isLoading={isLoading}
            tabs={[
                { label: "All", path: "/watchlist" },
                { label: "Custom", path: "/watchlist/customize" },
                { label: "CoinPage", path: "/watchlist/CoinPage" },
                { label: "Dashboard", path: "/watchlist/AdDashboard" },
                { label: "Users", path: "/watchlist/Users" },
                { label: "Admin", path: "/watchlist/Admin" },
            ]}>

            <div className="card-container">
                {coins.slice(0, 4).map((coin) => (
                <div key={coin.symbol} className="banner">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                            className="coin-image-top"
                            src={symbols[coin.symbol].img}
                            alt={coin.symbol}
                            />
                            <p className="coin-symbol-top">{coin.symbol}</p>
                        </div>

                        <p className="price-change-top" style={{
                            color:
                                coin.priceChangePercent > 0
                                ? "#21DB9A"
                                : coin.priceChangePercent < 0
                                ? "#FF0000"
                                : "#FFFFFF",
                            }}
                        > {parseFloat(coin.priceChangePercent).toFixed(2)} % </p>
                    </div>

                    <p className="price-top">{formatCurrency(coin.lastPrice)}</p>
                </div>
                ))}
            </div>

            <div className="watchlist-table-container">
                <Input type="search" placeholder="Search" style={{ width: "300px" }} onChange={setSearch} />

                <table className="watchlist-table">
                    <thead>
                        <tr>
                            <td colSpan={2}>Coin</td>
                            <td>Price</td>
                            <td>24h Change</td>
                            <td>Market Volume</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoins.map((coin) => {
                        const price = formatCurrency(coin.lastPrice);
                        const volume = formatCurrency(coin.quoteVolume);
                        return (
                            <tr key={coin.symbol}>
                                <td style={{ width: "40px" }}>
                                    <img className="coin-image" src={symbols[coin.symbol].img} alt={coin.symbol} />
                                </td>

                                <td style={{ width: "150px" }}>
                                    <div className="coin-name-container">
                                        <span className="coin-name"> {symbols[coin.symbol].name} </span>
                                        <span className="coin-symbol">{coin.symbol}</span>
                                    </div>
                                </td>

                                <td> {price} </td>

                                <td style={{ color:
                                    coin.priceChangePercent > 0
                                    ? "#21DB9A"
                                    : coin.priceChangePercent < 0
                                    ? "#FF0000"
                                    : "#FFFFFF",
                                }} > {coin.priceChangePercent} % </td>

                                <td>{volume}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </BasicPage>
    );
};

export default Watchlist;
