import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendingCoinChart = () => {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchTrendingCoin = async () => {
      try {
        // Get the trending coin
        const trendingResponse = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const trendingCoin = trendingResponse.data.coins[0].item.id;

        // Get today's date
        const today = new Date().toISOString().split("T")[0];

        // Get the coin's price data for today
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${trendingCoin}/market_chart?vs_currency=usd&days=1`
        );
        const priceData = priceResponse.data.prices;

        setCoinData({ id: trendingCoin, prices: priceData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrendingCoin();
  }, []);

  useEffect(() => {
    if (coinData) {
      const labels = coinData.prices.map((price) => {
        const date = new Date(price[0]);
        return `${date.getHours()}:${date.getMinutes()}`;
      });

      const data = coinData.prices.map((price) => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${coinData.id.toUpperCase()} Price (USD)`,
            data,
            borderColor: "#60a3bc",
            tension: 0.1,
          },
        ],
      });
    }
  }, [coinData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trending Coin Price Fluctuations (Today)",
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
      },
    },
  };

  return (
    <div style={{ height: "25rem", width: "100%" }}>
      {chartData ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default TrendingCoinChart;
