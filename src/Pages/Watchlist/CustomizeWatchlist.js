import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import "./CustomizeWatchlist.css";
import Modal from "../../Components/Modal/Modal";
import symbols from "../../Assets/Images/Coin Images.json";


const Watchlist1 = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCoinSelected, setIsCoinSelected] = useState(false);
  const [modalFilteredCoins, setModalFilteredCoins] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols.coinsList}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          const data = res.data
            .map((coin) => {
              coin.symbol = coin.symbol.slice(0, -4);
              return coin;
            })
            .sort((a, b) => b.quoteVolume - a.quoteVolume);
          setCoins(data);
          setModalFilteredCoins(data); // Set filtered coins for modal initially
        } else {
          console.error("API response is not an array:", res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleRowClick = (selectedCoin) => {
    const coinDetails = {
      name: symbols[selectedCoin.symbol]?.name,
      price: formatCurrency(selectedCoin.lastPrice),
      symbol: selectedCoin.symbol,
      priceChange: selectedCoin.priceChange,
      marketcap: formatCurrency(selectedCoin.quoteVolume),
    };

    // Combine the previously selected coins with the newly selected one
    const updatedSelectedCoins = [...selectedCoins, coinDetails];

    // Update the state with the new selected coins array
    setSelectedCoins(updatedSelectedCoins);

    // Remove the selected coin from the filtered coins state (modal view)
    setModalFilteredCoins((prevCoins) =>
      prevCoins.filter((coin) => coin.symbol !== selectedCoin.symbol)
    );

    // Set flag to indicate a coin is selected
    setIsCoinSelected(true);

    // Log all selected coins
    console.log(updatedSelectedCoins);
  };

  const handleRemoveCoin = (symbol) => {
    // Find the index of the coin to remove
    const index = selectedCoins.findIndex((coin) => coin.symbol === symbol);
    if (index !== -1) {
      // Remove the coin from the selectedCoins array
      const updatedSelectedCoins = [...selectedCoins];
      updatedSelectedCoins.splice(index, 1);
      setSelectedCoins(updatedSelectedCoins);

      // Find the coin in the coins array and add it back to the modalFilteredCoins array
      const coinToAddBack = coins.find((coin) => coin.symbol === symbol);
      if (coinToAddBack) {
        setModalFilteredCoins((prevCoins) => [...prevCoins, coinToAddBack]);
      }
    }
  };



  const formatCurrency = (amount) => {
    const amountString = parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    });
    return "$ " + amountString;
  };

  const filteredCoins = coins.filter((coin) =>
    symbols[coin.symbol]?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const top4Coins = filteredCoins.slice(0, 4);

  return (
    <BasicPage
      tabs={[
        { label: "All", path: "/watchlist" },
        { label: "Custom", path: "/watchlist/customize" },
      ]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "5vh",
          marginBottom: "7vh",
        }}
      >
        {top4Coins.map((coin) => (
          <div key={coin.symbol} className="banner">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="coin-image-top"
                  src={symbols[coin.symbol].img}
                  alt={coin.symbol}
                />
                <p className="coin-symbol-top">{coin.symbol.toUpperCase()}</p>
              </div>

              <p
                className="price-change-top"
                style={{
                  color:
                    coin.priceChangePercent > 0
                      ? "#21DB9A"
                      : coin.priceChangePercent < 0
                      ? "#FF0000"
                      : "#FFFFFF",
                }}
              >
                {" "}
                {parseFloat(coin.priceChangePercent).toFixed(2)} %{" "}
              </p>
            </div>

            <p className="price-top">{formatCurrency(coin.lastPrice)}</p>
          </div>
        ))}
      </div>

      <div className="watchlist-table-container">
        <div
          style={{ display: "flex", marginLeft: "700px", marginBottom: "0px" }}
        >
          <div>
            <Input
              type="button"
              value="Add Coin"
              outlined
              green
              style={{ width: "150px", marginLeft: "120%" }}
              onClick={() => setIsDeleteModalOpen(true)}
            />
            <Modal
              open={isDeleteModalOpen}
              close={() => setIsDeleteModalOpen(false)}
            >
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
                    onChange={(e) => setSearch(e.target.value)}
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
                    {modalFilteredCoins.map((coin) => (
                      <tr key={coin.id} onClick={() => handleRowClick(coin)}>
                        <td
                          style={{ marginLeft: "100px", marginBottom: "50px" }}
                        >
                          <img
                            className="coin-image-add"
                            src={symbols[coin.symbol].img}
                            alt={coin.symbol}
                          />

                          <span className="coin-symbol-add">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </td>

                        <td className="coin-price-add">
                          {formatCurrency(coin.lastPrice)}
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
            {selectedCoins.map((coin) => {
              const price = formatCurrency(coin.lastPrice);
              const volume = formatCurrency(coin.quoteVolume);
              return (
                <tr key={coin.symbol}>
                  <td style={{ width: "40px" }}>
                    <img
                      className="coin-image"
                      src={symbols[coin.symbol].img}
                      alt={coin.symbol}
                    />
                  </td>
                  <td style={{ width: "150px" }}>
                    <div className="coin-name-container">
                      <span className="coin-name">{coin.name}</span>
                      <span className="coin-symbol">{coin.symbol}</span>
                    </div>
                  </td>
                  <td>{coin.price}</td>
                  <td
                    style={{
                      color:
                        coin.priceChange> 0
                          ? "#21DB9A"
                          : coin.priceChange < 0
                          ? "#FF0000"
                          : "#FFFFFF",
                    }}
                  >
                    {" "}
                    {parseFloat(coin.priceChange).toFixed(2)} %
                  </td>
                  <td>{coin.marketcap}</td>
                  <td>
                    <Input
                      type="button"
                      value="Remove"
                      outlined
                      red
                      style={{ width: "150px" }}
                      onClick={() => handleRemoveCoin(coin.symbol)}
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
