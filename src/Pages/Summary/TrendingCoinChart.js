import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const TrendingCoinChart = () => {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    fetchTrendingCoin();
  }, []);

  const fetchTrendingCoin = async () => {
    try {
      setIsLoading(true);
      // Get the trending coin
      const trendingResponse = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const trendingCoin = trendingResponse.data.coins[0].item.id;

      // Get the coin's price data for today
      const priceResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${trendingCoin}/market_chart?vs_currency=usd&days=1`
      );
      const priceData = priceResponse.data.prices;

      setCoinData({ id: trendingCoin, prices: priceData });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch trending coin data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (coinData) {
      const sampleData = (data, interval) => {
        return data.filter((_, index) => index % interval === 0);
      };

      const sampledPrices = sampleData(coinData.prices, 10); // Adjust the interval as needed

      const labels = sampledPrices.map((price) => {
        const date = new Date(price[0]);
        return `${date.getHours()}:${date.getMinutes()}`;
      });

      const data = sampledPrices.map((price) => price[1]);

      const minPrice = Math.min(...data);
      const maxPrice = Math.max(...data);

      const roundToSignificant = (num, significant) => {
        return Math.ceil(num / significant) * significant;
      };

      const stepSize = roundToSignificant(
        (maxPrice - minPrice) / 5,
        Math.pow(10, Math.floor(Math.log10((maxPrice - minPrice) / 5)))
      );
      const adjustedMin = Math.max(
        0,
        Math.floor(minPrice / stepSize) * stepSize
      );
      const adjustedMax = roundToSignificant(maxPrice, stepSize);

      setChartData({
        labels,
        datasets: [
          {
            label: `${coinData.id.toUpperCase()} Price (USD)`,
            data,
            borderColor: "#00d2d3",
            tension: 0.2,
          },
        ],
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Trending Coin Price Fluctuations (Today)",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `$${context.parsed.y.toFixed(6)}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (HH:MM)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Price (USD)",
            },
            ticks: {
              callback: function (value) {
                return `$${value.toFixed(6)}`;
              },
              stepSize: stepSize,
            },
            min: adjustedMin,
            max: adjustedMax,
          },
        },
      });
    }
  }, [coinData]);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ height: "18rem", width: "100%" }}>
      {chartData ? (
        // <div style={{ height: "100%", width: "100%" }}>
        <Line data={chartData} options={chartOptions} />
      ) : (
        // </div>
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default TrendingCoinChart;
