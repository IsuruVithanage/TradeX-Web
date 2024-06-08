import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto"; // This is important for Chart.js v3
import "./SummaryReport.css";

const SummaryReport = ({
  coins,
  showTopGainers,
  showTopLosses,
  showTrendingCoin,
  customizedCoins,
  trendingPrices,
  tradingHistory,
  tradingSuggestions,
}) => {
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

  return (
    <div className="summary-report">
      <h2>Daily Summary Report - {new Date().toISOString().split("T")[0]}</h2>

      {showTopGainers && (
        <div className="top-gainers">
          <h3>Top Gainers</h3>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {topGainers.map((coin) => (
                <tr key={coin.symbol}>
                  <td>{coin.symbol}</td>
                  <td>{formatCurrency(coin.lastPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTopLosses && (
        <div className="top-losers">
          <h3>Top Losers</h3>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {topLosers.map((coin) => (
                <tr key={coin.symbol}>
                  <td>{coin.symbol}</td>
                  <td>{formatCurrency(coin.lastPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTrendingCoin && trendingPrices.length > 0 && (
        <div className="trending-coin">
          <h3>Trending Coin</h3>
          <Line
            data={{
              labels: Array.from(
                { length: trendingPrices.length },
                (_, i) => i + 1
              ),
              datasets: [
                {
                  label: "Price",
                  data: trendingPrices,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={{ scales: { y: { beginAtZero: false } } }}
          />
        </div>
      )}

      {customizedCoins.length > 0 && (
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
                  backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
              ],
            }}
            options={{ scales: { y: { beginAtZero: true } } }}
          />
        </div>
      )}

      {/* Add sections for tradingHistory and tradingSuggestions if needed */}
    </div>
  );
};

export default SummaryReport;
