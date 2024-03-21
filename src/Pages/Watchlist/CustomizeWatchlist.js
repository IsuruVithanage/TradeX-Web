import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import "./CustomizeWatchlist.css";
import Modal from "../../Components/Modal/Modal";

const Watchlist1 = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);

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
      
      <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: "5vh", marginBottom: "7vh"}}>
        {top4Coins.map((coin) => (
          <div key={coin.symbol} className="banner">
            <div style={{ display: "flex", alignItems: "center"}}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <img
                  className="coin-image-top"
                  src={coin.image}
                  alt={coin.symbol}
                />
                <p className="coin-symbol-top">{coin.symbol.toUpperCase()}</p>
              </div>

              <p
                className="price-change-top"
                style={{
                  color:
                    coin.price_change_percentage_24h > 0 ? "#21DB9A" :
                    coin.price_change_percentage_24h < 0 ? "#FF0000" : "#FFFFFF"
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)} %
              </p>
            </div>

            <p className="price-top">{formatCurrency(coin.current_price)}</p>
            
          </div>
        ))}
      </div>

      <div className="watchlist-table-container">
        <div
          style={{ display: "flex", marginLeft: "700px", marginBottom: "0px" }}
        >
          <Input
            type="search"
            placeholder="Search"
            style={{ width: "300px", float: "right", marginRight: "50px" }}
            onChange={setSearch}
          />
          <div>
            <Input
              type="button"
              value="Add Coin"
              outlined
              green
              style={{ width: "150px" }}
              onClick={() => setIsdeleteModalOpen(true)}
            />
            <Modal open={isdeleteModalOpen} close={setIsdeleteModalOpen}>
              <div style={{ width: "450px" }}>
                <h2>Select Coin</h2>
                <div>
                  <Input
                    type="search"
                    placeholder="Search"
                    style={{
                      width: "400px",
                      float: "right",
                      marginRight: "50px",
                    }}
                    onChange={setSearch}
                  />
                </div>

                <table className="watchlist-table-modal">
                  <thead
                    style={{
                      color: "#dbdbdb",
                      fontSize: "18px",
                      marginBottom: "20px",
                    }}
                  >
                    <tr>
                      <td>Coin</td>
                      <td>Price</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoins.map((coin) => (
                      <tr key={coin.id}>
                        <td
                          style={{ marginLeft: "100px", marginBottom: "50px" }}
                        >
                          <img
                            className="coin-image-add"
                            src={coin.image}
                            alt={coin.symbol}
                          />
                          <span className="coin-symbol-add">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </td>

                        <td className="coin-price-add">
                          {formatCurrency(coin.current_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal>
          </div>
        </div>

        <table className="watchlist-table">
          <thead>
            <tr>
              <td colSpan={2}>Coin</td>
              <td>Price</td>
              <td>24h Change</td>
              <td>Market Cap</td>
              <td></td>
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
                  <td>
                    <Input
                      type="button"
                      value="Remove"
                      outlined
                      red
                      style={{ width: "150px" }}
                    />
                  </td>
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
