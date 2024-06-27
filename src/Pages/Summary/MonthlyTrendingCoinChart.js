import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MonthlyTrendingCoinChart = () => {
  const [trendingCoin, setTrendingCoin] = useState(null);
  const [trendingCoinPrices, setTrendingCoinPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingCoin();
  }, []);

  const fetchTrendingCoin = async () => {
    try {
      setIsLoading(true);
      const trendingResponse = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const topTrendingCoin = trendingResponse.data.coins[0].item;

      setTrendingCoin(topTrendingCoin);

      const historicalDataResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${topTrendingCoin.id}/market_chart?vs_currency=usd&days=30`
      );

      setTrendingCoinPrices(historicalDataResponse.data.prices);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trending coin data:", error);
      setError("Failed to fetch trending coin data. Please try again later.");
      setIsLoading(false);
    }
  };

  const priceData = trendingCoinPrices.map((price) => price[1]);
  const minPrice = Math.min(...priceData);
  const maxPrice = Math.max(...priceData);

  // Function to round to nearest significant number
  const roundToSignificant = (num, significant) => {
    return Math.ceil(num / significant) * significant;
  };

  // Calculate step size and adjust min/max
  const stepSize = roundToSignificant(
    (maxPrice - minPrice) / 5,
    Math.pow(10, Math.floor(Math.log10((maxPrice - minPrice) / 5)))
  );
  const adjustedMin = Math.max(0, Math.floor(minPrice / stepSize) * stepSize);
  const adjustedMax = roundToSignificant(maxPrice, stepSize);

  const trendingCoinChartData = {
    labels: trendingCoinPrices.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${trendingCoin?.symbol.toUpperCase()} Price`,
        data: priceData,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trending Coin Price (Last 30 Days)",
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
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
        ticks: {
          callback: function (value, index, values) {
            return "$" + value.toFixed(6);
          },
          stepSize: stepSize,
        },
        min: adjustedMin,
        max: adjustedMax,
      },
    },
  };

  if (isLoading) {
    return <div>Loading trending coin data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="monthly-trending-coin-chart"
      style={{ height: "18rem", width: "100%" }}
    >
      <h4>
        Monthly Trending Coin: {trendingCoin.name} (
        {trendingCoin.symbol.toUpperCase()})
      </h4>
      <Line data={trendingCoinChartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyTrendingCoinChart;
