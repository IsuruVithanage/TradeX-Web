import * as React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // This is important for Chart.js v3
import "./SummaryReport.css";
import symbolsJson from "../../Assets/Images/Coin Images.json";
import TrendingCoinChart from "./TrendingCoinChart";
import trade from "../../Assets/Images/trade.png";
import { useState, useEffect } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

const SummaryReport = ({
  coins,
  showTopGainers,
  showTopLosses,
  showTrendingCoin,
  customizedCoins,
  tradingHistory,
  selectedCoins,
  showTradingHistory,
}) => {
  const getRecentTradingHistory = () => {
    if (!Array.isArray(tradingHistory)) {
      return [];
    }
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return tradingHistory.filter(
      (order) => new Date(order.date).toDateString() === now.toDateString()
    );
  };

  const recentTradingHistory = getRecentTradingHistory();
  console.log("Recent Trading History:", recentTradingHistory);
  const [symbols, setSymbols] = useState({});

  useEffect(() => {
    const loadSymbols = async () => {
      const loadedSymbols = await Promise.all(
        Object.entries(symbolsJson).map(async ([key, value]) => {
          try {
            const base64 = await getBase64FromUrl(value.img);
            return [key, { ...value, img: base64 }];
          } catch (error) {
            console.error(`Failed to fetch image for ${key}:`, error);
            return [key, value];
          }
        })
      );
      setSymbols(Object.fromEntries(loadedSymbols));
    };

    loadSymbols();
  }, []);

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const topGainers = coins
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 5);
  const topLosers = coins
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return (
      "$ " +
      parseFloat(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 20,
      })
    );
  };

  useEffect(() => {
    console.log("showTradingHistory:", showTradingHistory);
    console.log("tradingHistory:", tradingHistory);
    if (tradingHistory) {
      console.log("tradingHistory length:", tradingHistory.length);
      console.log("First trading history item:", tradingHistory[0]);
    }
  }, [showTradingHistory, tradingHistory]);

  // Chart data for selected coins
  const selectedCoinsChartData = {
    labels: selectedCoins.map((coin) => coin.symbol),
    datasets: [
      {
        label: "Average Price",
        data: selectedCoins.map((coin) => parseFloat(coin.lastPrice)),
        // backgroundColor: selectedCoins.map(
        //   (coin, index) =>
        //     `hsl(${(index * 360) / selectedCoins.length}, 70%, 50%)`
        // ),
        backgroundColor: "#00d2d3",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "#54a0ff",
      },
    ],
  };

  // Chart options for selected coins
  const selectedCoinsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
          font: { weight: "bold" },
          color: "#ffffff",
        },
        ticks: {
          callback: (value) => formatCurrency(value),
        },
      },
      x: {
        title: {
          display: true,
          text: "Coin",
          font: { weight: "bold" },
          color: "#ffffff",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Selected Coins Average Prices",
        font: { size: 16, weight: "bold" },
        color: "#ffffff",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Price: ${formatCurrency(context.parsed.y)}`,
          color: "#ffffff",
        },
      },

      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 12,
        },
        anchor: "end",
        align: "top",
      },
    },
  };

  return (
    <div className="summary-report">
      <div className="summary-header">
        <img
          src={trade}
          width="65px"
          alt="tradex"
          style={{ float: "right", marginTop: "-1.5rem" }}
        />
        <h3>
          Daily Summary Report <br /> {new Date().toISOString().split("T")[0]}
        </h3>
      </div>
      <div className="tables">
        {showTopGainers && (
          <div className="top-gainers" style={{ display: "inline-block" }}>
            <h5>Top Gainers</h5>
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {topGainers.map((coin) => (
                  <tr key={coin.symbol}>
                    <td>
                      <img
                        src={
                          symbols[coin.symbol]?.img ||
                          "path/to/default-image.png"
                        }
                        alt={coin.symbol}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {coin.symbol}
                    </td>
                    <td>{formatCurrency(coin.lastPrice)}</td>
                    <td
                      style={{
                        color:
                          parseFloat(coin.priceChangePercent) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {parseFloat(coin.priceChangePercent).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showTopLosses && (
          <div
            className="top-losers"
            style={{ display: "inline-block", marginLeft: "0.5rem" }}
          >
            <h5>Top Losers</h5>
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {topLosers.map((coin) => (
                  <tr key={coin.symbol}>
                    <td>
                      <img
                        src={
                          symbols[coin.symbol]?.img ||
                          "path/to/default-image.png"
                        }
                        alt={coin.symbol}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {coin.symbol}
                    </td>
                    <td>{formatCurrency(coin.lastPrice)}</td>
                    <td
                      style={{
                        color:
                          parseFloat(coin.priceChangePercent) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {parseFloat(coin.priceChangePercent).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showTrendingCoin && (
        <div
          className="trending-coin"
          style={{ height: "400px", marginTop: "1.8rem" }}
        >
          <h4>Trending Coin</h4>
          <TrendingCoinChart />
        </div>
      )}
      {selectedCoins.length > 0 && (
        <div
          className="selected-coins"
          style={{ height: "400px", marginTop: "0.5rem" }}
        >
          <h4>Customized Coins</h4>
          <div style={{ height: "300px" }}>
            <Bar
              data={selectedCoinsChartData}
              options={selectedCoinsChartOptions}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      )}

      {showTradingHistory && recentTradingHistory.length > 0 && (
        <div className="trading-history">
          <h4>Trading History</h4>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTradingHistory.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.coin}</td>
                  <td>{trade.type}</td>
                  <td>{formatCurrency(trade.totalPrice)}</td>
                  <td>{formatCurrency(trade.price)}</td>
                  <td>{new Date(trade.date).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SummaryReport;
