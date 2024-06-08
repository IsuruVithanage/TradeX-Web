import React from "react";
import "./dailysummary.css";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import symbols from "../../Assets/Images/Coin Images.json";
import axios from "axios";
import SummaryReport from "./SummaryReport";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Dailysummary() {
  // create the tabs
  const Tabs = [
    { label: "Daily", path: "/Summary/Dailysummary" },
    { label: "Monthly", path: "Dailysummary/Monthlysummary" },
  ];
  // imported
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCoinSelected, setIsCoinSelected] = useState(false);

  // create state variable for each toggle
  const [showTopGainers, setShowTopGainers] = useState(false);
  const [showTopLosses, setShowTopLosses] = useState(false);
  const [showTrendingCoin, setShowTrendingCoin] = useState(false);
  const [showTradingHistory, setShowTradingHistory] = useState(false);
  const [showTradingSuggestions, setShowTradingSuggestions] = useState(false);

  const [trendingPrices, setTrendingPrices] = useState([]);
  const [tradingHistory, setTradingHistory] = useState([]);
  const [tradingSuggestions, setTradingSuggestions] = useState([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // for customized coin
  const [customizedCoins, setCustomizedCoins] = useState([]);

  // coin table
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
    // console.log(coinDetails);
    // setIsCoinSelected(true);

    // for pdf use
    setCustomizedCoins([...customizedCoins, coinDetails]);
    setIsDeleteModalOpen(false);
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

  const fetchTrendingCoinData = async (symbol) => {
    try {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=30`
      );
      return res.data.map((candle) => parseFloat(candle[4]));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchTradingHistory = async () => {
    // Replace with your actual API call
    return [{ coin: "BTC", type: "Buy", price: 50000, date: "2024-01-01" }];
  };

  const fetchTradingSuggestions = async () => {
    // Replace with your actual API call
    return [{ coin: "ETH", action: "Sell", price: 2000, date: "2024-01-02" }];
  };

  useEffect(() => {
    if (showTrendingCoin && coins.length > 0) {
      const trendingCoin = coins.reduce((prev, curr) =>
        prev.quoteVolume > curr.quoteVolume ? prev : curr
      );
      fetchTrendingCoinData(trendingCoin.symbol).then((prices) =>
        setTrendingPrices(prices)
      );
    }
    if (showTradingHistory)
      fetchTradingHistory().then((history) => setTradingHistory(history));
    if (showTradingSuggestions)
      fetchTradingSuggestions().then((suggestions) =>
        setTradingSuggestions(suggestions)
      );
  }, [showTrendingCoin, coins, showTradingHistory, showTradingSuggestions]);

  //generate pdf

  const generatePDF = async () => {
    const reportElement = document.createElement("div");
    reportElement.style.position = "absolute";
    reportElement.style.left = "-9999px";
    document.body.appendChild(reportElement);

    ReactDOM.render(
      <SummaryReport
        coins={coins}
        showTopGainers={showTopGainers}
        showTopLosses={showTopLosses}
        showTrendingCoin={showTrendingCoin}
        customizedCoins={customizedCoins}
        trendingPrices={trendingPrices}
        tradingHistory={tradingHistory}
        tradingSuggestions={tradingSuggestions}
      />,
      reportElement
    );

    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("daily_summary.pdf");

    document.body.removeChild(reportElement);
  };

  <Modal open={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
    <SummaryReport
      coins={coins}
      showTopGainers={showTopGainers}
      showTopLosses={showTopLosses}
      showTrendingCoin={showTrendingCoin}
      customizedCoins={customizedCoins}
      trendingPrices={trendingPrices}
      tradingHistory={tradingHistory}
      tradingSuggestions={tradingSuggestions}
    />
  </Modal>;

  return (
    // daily summary front end
    <BasicPage tabs={Tabs}>
      <div className="heading">Generate Daily Summary</div>
      <div className="page-content">
        <div className="left-side">
          <div className="add-items">
            <div className="add-coins">
              {/* <Input
            type="search"
            placeholder="Search"
            style={{ width: "300px", float: "right", marginRight: "50px" }}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
              <div>
                <div
                  className="tog-name"
                  style={{
                    display: "inline-block",
                    marginLeft: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  <span>Customize Coins</span>
                </div>
                <div
                  className="coin-button"
                  style={{ display: "inline-block", marginLeft: "6.5rem" }}
                >
                  <Input
                    type="button"
                    value="Add Coin"
                    outlined
                    green
                    style={{ width: "150px", marginLeft: "120%" }}
                    onClick={() => setIsDeleteModalOpen(true)}
                  />
                </div>
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
                        {filteredCoins.map((coin) => (
                          <tr
                            key={coin.id}
                            onClick={() => handleRowClick(coin)}
                          >
                            <td
                              style={{
                                marginLeft: "100px",
                                marginBottom: "50px",
                              }}
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
              <div className="chart-table">
                <div className="data">
                  <div className="tog-name">
                    <span>Top Gain</span>
                  </div>
                  <div className="tog1">
                    <Input
                      type="toggle"
                      id="topGainers"
                      checked={showTopGainers}
                      onChange={() => setShowTopGainers(!showTopGainers)}
                    />
                  </div>
                </div>

                <div className="data">
                  <div className="tog-name">
                    <span>Top Losses</span>
                  </div>
                  <div className="tog2">
                    <Input
                      type="toggle"
                      id="topLosses"
                      checked={showTopLosses}
                      onChange={() => setShowTopLosses(!showTopLosses)}
                    />
                  </div>
                </div>

                <div className="data">
                  <div className="tog-name">
                    <span>Trending Coin</span>
                  </div>
                  <div className="tog3">
                    <Input
                      type="toggle"
                      id=""
                      checked={showTrendingCoin}
                      onChange={() => setShowTrendingCoin(!showTrendingCoin)}
                    />
                  </div>
                </div>

                <div className="data">
                  <div className="tog-name">
                    <span>Trading History</span>
                  </div>
                  <div className="tog4">
                    <Input
                      type="toggle"
                      id=""
                      checked={showTradingHistory}
                      onChange={() =>
                        setShowTradingHistory(!showTradingHistory)
                      }
                    />
                  </div>
                </div>

                <div className="data">
                  <div className="tog-name">
                    <span>Trading Suggestion History</span>
                  </div>
                  <div className="tog5">
                    <Input type="toggle" id="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="default">
              <div className="defaultname">
                <span>Set this features as default</span>
              </div>
              <div className="tog6">
                <Input
                  type="toggle"
                  id=""
                  checked={showTradingSuggestions}
                  onChange={() =>
                    setShowTradingSuggestions(!showTradingSuggestions)
                  }
                />
              </div>
            </div>

            <div className="box-container"></div>
          </div>
        </div>

        <div className="right-side">
          <div className="template"></div>
          <div className="buttons">
            <Input
              type="button"
              value="Generate"
              className="generate-button"
              style={{ width: "87px" }}
              onClick={() => setIsPreviewModalOpen(true)}
            />

            <div className="preview"></div>

            <Input
              type="button"
              value="Download"
              className="download-button"
              onClick={generatePDF}
              style={{ width: "87px", marginLeft: "28%" }}
            />
          </div>
        </div>
      </div>
    </BasicPage>
  );
}

export default Dailysummary;
