import React from "react";
import { Line } from "react-chartjs-2";

const TrendingCoinChart = ({ data, innerRef }) => (
  <div ref={innerRef}>
    <Line
      data={{
        labels: data.time,
        datasets: [
          {
            label: "Price",
            data: data.price,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      }}
    />
  </div>
);

export default TrendingCoinChart;
