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
  trendingPrices,
  tradingSuggestions,
  selectedCoins,
}) => {
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
    .slice(0, 4);
  const topLosers = coins
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 4);

  const formatCurrency = (amount) => {
    return (
      "$ " +
      parseFloat(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 20,
      })
    );
  };

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
        borderWidth: 1,
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
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Selected Coins Average Prices",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Price: ${formatCurrency(context.parsed.y)}`,
        },
      },

      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => formatCurrency(value),
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className="summary-report">
      <div className="summary-header">
        <h3>
          Daily Summary Report <br /> {new Date().toISOString().split("T")[0]}
        </h3>
        {/* <img src={trade} width="50px" alt="tradex" /> */}
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
      {/* {showTrendingCoin && trendingPrices.length > 0 && (
        <div className="trending-coin" style={{ height: "400px" }}>
          <h3>Trending Coin: {customizedCoins[0]?.name || "Unknown"}</h3>
          <Line
            data={{
              labels: trendingPrices.map((_, index) => {
                const date = new Date();
                date.setHours(
                  date.getHours() - (trendingPrices.length - index - 1)
                );
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }),
              datasets: [
                {
                  label: `${
                    customizedCoins[0]?.symbol.toUpperCase() || "COIN"
                  } Price`,
                  data: trendingPrices,
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time",
                    font: { weight: "bold" },
                  },
                  grid: { display: false },
                },
                y: {
                  title: {
                    display: true,
                    text: "Price ($)",
                    font: { weight: "bold" },
                  },
                  beginAtZero: false,
                  ticks: {
                    callback: (value) => formatCurrency(value),
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Price: ${formatCurrency(context.parsed.y)}`,
                  },
                },
                legend: {
                  labels: {
                    boxWidth: 0,
                    font: { weight: "bold" },
                  },
                },
              },
            }}
          />
        </div>
      )} */}
      {/* {customizedCoins.length > 0 && (
        <div className="customized-coins">
          <h3>Customized Coins</h3>
          <Bar
            data={{
              labels: customizedCoins.map((coin) => coin.name),
              datasets: [
                {
                  label: "Price",
                  data: customizedCoins.map((coin) =>
                    parseFloat(coin.price.replace("$", "").trim())
                  ),
                  backgroundColor: customizedCoins.map(
                    (coin) => `url(${symbols[coin.symbol]?.img})`
                  ),
                },
              ],
            }}
            options={{
              scales: { y: { beginAtZero: true } },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: (context) => {
                      const coin = customizedCoins[context[0].dataIndex];
                      return `${coin.name} (${coin.symbol.toUpperCase()})`;
                    },
                    label: (context) =>
                      `Price: ${formatCurrency(context.parsed.y)}`,
                  },
                },
              },
            }} */}
      {/* />
        </div>
      )} */}
      {/* Add sections for tradingHistory and tradingSuggestions if needed */}
    </div>
  );
};

export default SummaryReport;
