import * as React from "react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./MSummaryReport.css";
import MonthlyTrendingCoinChart from "./MonthlyTrendingCoinChart";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";

const MSummaryReport = ({
  showMonthlyPerformance,
  showTopGainers,
  showTopLosers,
  showTrendingCoin,
  selectedCoins = [],
  monthlySuggestions = [],
}) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);

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
    fetchData();
  }, []);

  useEffect(() => {
    calculateAveragePrice();
  }, [selectedCoins]);

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

  const fetchAndStoreImages = async (coins) => {
    for (let coin of coins) {
      try {
        const base64 = await getBase64FromUrl(coin.image);
        coin.imageBase64 = base64;
      } catch (error) {
        console.error(`Failed to fetch image for ${coin.symbol}:`, error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page: 1,
            sparkline: false,
            price_change_percentage: "30d",
          },
        }
      );

      const sortedData = response.data.sort(
        (a, b) =>
          b.price_change_percentage_30d_in_currency -
          a.price_change_percentage_30d_in_currency
      );

      const topGainers = sortedData.slice(0, 5).map((coin) => ({
        ...coin,
        imageBase64: null,
      }));
      const topLosers = sortedData
        .slice(-5)
        .reverse()
        .map((coin) => ({
          ...coin,
          imageBase64: null,
        }));

      await fetchAndStoreImages(topGainers);
      await fetchAndStoreImages(topLosers);

      setTopGainers(topGainers);
      setTopLosers(topLosers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateAveragePrice = () => {
    if (selectedCoins.length === 0) {
      setAveragePrice(0);
      return;
    }
    const sum = selectedCoins.reduce(
      (acc, coin) => acc + parseFloat(coin.lastPrice),
      0
    );
    setAveragePrice(sum / selectedCoins.length);
  };

  const prepareCustomizedCoinsData = () => {
    const data = selectedCoins.slice(0, 5).map((coin) => ({
      symbol: coin.symbol.toUpperCase(),
      price: parseFloat(coin.lastPrice),
    }));

    return {
      labels: data.map((coin) => coin.symbol),
      datasets: [
        {
          label: "Current Price",
          data: data.map((coin) => coin.price),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const customizedCoinsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Customized Coins Prices",
      },
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
  };

  return (
    <div className="monthly-summary-report">
      <div className="summary-header">
        <h3>
          Monthly Summary Report <br />{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      <div className="tables">
        {showTopGainers && (
          <div className="top-gainers" style={{ display: "inline-block" }}>
            <h5>Top Monthly Gainers</h5>
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
                  <tr key={coin.id}>
                    <td>
                      <img
                        src={coin.imageBase64 || "path/to/default-image.png"}
                        alt={coin.symbol}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {coin.symbol.toUpperCase()}
                    </td>
                    <td>{formatCurrency(coin.current_price)}</td>
                    <td style={{ color: "green" }}>
                      {coin.price_change_percentage_30d_in_currency.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showTopLosers && (
          <div
            className="top-losers"
            style={{ display: "inline-block", marginLeft: "0.5rem" }}
          >
            <h5>Top Monthly Losers</h5>
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Monthly Change</th>
                </tr>
              </thead>
              <tbody>
                {topLosers.map((coin) => (
                  <tr key={coin.id}>
                    <td>
                      <img
                        src={coin.imageBase64 || "path/to/default-image.png"}
                        alt={coin.symbol}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {coin.symbol.toUpperCase()}
                    </td>
                    <td>{formatCurrency(coin.current_price)}</td>
                    <td style={{ color: "red" }}>
                      {coin.price_change_percentage_30d_in_currency.toFixed(2)}%
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
          <h4>Monthly Trending Coin</h4>
          <MonthlyTrendingCoinChart />
        </div>
      )}

      {selectedCoins && selectedCoins.length > 0 && (
        <div
          className="selected-coins"
          style={{ height: "400px", marginTop: "0.5rem" }}
        >
          <h4>Customized Coins</h4>

          <div style={{ height: "300px" }}>
            <Bar
              data={prepareCustomizedCoinsData()}
              options={customizedCoinsChartOptions}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      )}

      {monthlySuggestions && monthlySuggestions.length > 0 && (
        <div className="monthly-suggestions">
          <h4>Monthly Trading Suggestions</h4>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Action</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {monthlySuggestions.map((suggestion, index) => (
                <tr key={index}>
                  <td>{suggestion.coin}</td>
                  <td>{suggestion.action}</td>
                  <td>{formatCurrency(suggestion.price)}</td>
                  <td>{suggestion.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MSummaryReport;
