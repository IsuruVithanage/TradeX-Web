import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const TestChart = () => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const processData = async (newData) => {
            try {
                const transformedData = newData.map((item) => ({
                    open: parseFloat(item[1]),
                    high: parseFloat(item[2]),
                    low: parseFloat(item[3]),
                    close: parseFloat(item[4]),
                    time: item[0] / 1000,
                }));

                transformedData.sort((a, b) => a.time - b.time);

                return transformedData;
            } catch (error) {
                console.error('Error processing data:', error);
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`
                );

                return processData(res.data);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        const updateData = async () => {
            try {
                const res = await axios.get(
                    `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1`
                );
                const result = await processData(res.data);
                if (result && result.length > 0) {
                    const latestData = result[0];
                    // Assuming series is the candlestick series in the chart
                    series.update(latestData);
                }
            } catch (error) {
                console.error('Error updating real-time data:', error);
            }
        };

        // Chart initialization and data loading
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.offsetWidth,
            height: chartContainerRef.current.offsetHeight,
            layout: {
                backgroundColor: '#000',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: {
                    color: '#333',
                },
                horzLines: {
                    color: '#333',
                },
            },
        });

        const series = chart.addCandlestickSeries({
            upColor: '#4CAF50',
            borderUpColor: '#4CAF50',
            wickUpColor: '#4CAF50',
            downColor: '#E91E63',
            borderDownColor: '#E91E63',
            wickDownColor: '#E91E63',
        });

        fetchData().then((data) => {
            if (data && data.length > 0) {
                series.setData(data);
                chart.timeScale().fitContent();
            }
        });

        // Real-time data update interval
        const updateInterval = setInterval(updateData, 600); // Update every 1 minute

        return () => {
            clearInterval(updateInterval);
            chart.remove();
        };
    }, []);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default TestChart;
