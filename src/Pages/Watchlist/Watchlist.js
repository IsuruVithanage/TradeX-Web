import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import "./Watchlist.css";

const Watchlist1 = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const formatCurrency = (amount) => {
    const amountString = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    });
    return "$ " + amountString;
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const top4Coins = filteredCoins.slice(0, 4);

  return (
    <BasicPage
      tabs={[
        { label: "All", path: "/watchlist" },
        { label: "Custom", path: "/watchlist/customize" },
        { label: "CoinPage", path: "/watchlist/CoinPage" },
        { label: "Dashboard", path: "/watchlist/AdDashboard" },
        { label: "ViewAll", path: "/watchlist/ViewAll" },
        { label: "Users", path: "/watchlist/Users" },
        { label: "Admin", path: "/watchlist/Admin" },
      ]}
    >
      <div style={{ display: "flex" }}>
        {top4Coins.map((coin) => (
          <div key={coin.id} className="banner">
            <div style={{ display: "flex" }}>
              <img
                className="coin-image-top"
                src={coin.image}
                alt={coin.symbol}
              />
              <p className="coin-symbol-top">{coin.symbol.toUpperCase()}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p className="price-top">{formatCurrency(coin.current_price)}</p>
              <p
                className="price-change-top"
                style={{
                  color:
                    coin.price_change_percentage_24h > 0
                      ? "#21DB9A"
                      : "#FF0000",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)} %
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="watchlist-table-container">
        <Input
          type="search"
          placeholder="Search"
          style={{ width: "300px" }}
          onChange={handleChange}
        />

        <table className="watchlist-table">
          <thead>
            <tr>
              <td colSpan={2}>Coin</td>
              <td>Price</td>
              <td>24h Change</td>
              <td>Market Cap</td>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => {
              const price = formatCurrency(coin.current_price);
              const mktCap = formatCurrency(coin.market_cap);
              return (
                <tr key={coin.id}>
                  <td style={{ width: "40px" }}>
                    <img
                      className="coin-image"
                      src={coin.image}
                      alt={coin.symbol}
                    />
                  </td>
                  <td style={{ width: "150px" }}>
                    <div className="coin-name-container">
                      <span className="coin-name">{coin.name}</span>
                      <span className="coin-symbol">{coin.symbol}</span>
                    </div>
                  </td>
                  <td>{price}</td>
                  <td
                    style={{
                      color:
                        coin.price_change_percentage_24h > 0
                          ? "#21DB9A"
                          : "#FF0000",
                    }}
                  >
                    {coin.price_change_percentage_24h} %
                  </td>
                  <td>{mktCap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </BasicPage>
  );
};

export default Watchlist1;
