import React, { useEffect, useRef, useState } from 'react';
import './TradingChart.css';
import { ColorType, createChart } from 'lightweight-charts';
import axios from 'axios';

export const ChartComponent = (props) => {
    const [activeDuration, setActiveDuration] = useState('1m');
    const chartContainerRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const seriesRef = useRef(null);
    const updateIntervalRef = useRef(null);
    const [tradeData, setTradeData] = useState([]);

    const {
        selectedCoin,
        updateLastPrice,
        colors: {
            backgroundColor = '#0E0E0F',
            textColor = '#0E0E0F',
            upColor = '#21DB9A',
            downColor = '#ff0000',
            wickUpColor = '#21DB9A',
            wickDownColor = '#ff0000',
        } = {},
    } = props;

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

            setTradeData(transformedData);
            return transformedData;
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()}USDT&interval=${activeDuration}&limit=1000`
            );
            const latestPrice = parseFloat(res.data[res.data.length - 1][4]);
            const latestTime = parseFloat(res.data[res.data.length - 1][0]);
            updateLastPrice(latestPrice, latestTime);

            const data = await processData(res.data);
            setTradeData(data);
            return data;
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    const updateData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()}USDT&interval=${activeDuration}&limit=1`
            );
            const latestPrice = parseFloat(res.data[res.data.length - 1][4]);
            const latestTime = parseFloat(res.data[res.data.length - 1][0]);
            updateLastPrice(latestPrice, latestTime);
            const result = await processData(res.data);
            if (result && result.length > 0) {
                const latestData = result[0];
                seriesRef.current.update(latestData);
            }
        } catch (error) {
            console.error('Error updating real-time data:', error);
        }
    };

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.offsetWidth,
            height: chartContainerRef.current.offsetHeight,
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { color: "#3C3C3C" },
            },
            rightPriceScale: { borderVisible: false, textColor: "#AAA" },
            localization: {
                priceFormatter: price => '$ ' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            },
            timeScale: { 
                fixLeftEdge: true, 
                borderVisible: false,
                timeVisible: true,
                lockVisibleTimeRangeOnResize: true,
            }
        });

        const series = chart.addCandlestickSeries({
            upColor,
            downColor,
            borderVisible: false,
            wickUpColor,
            wickDownColor
        });

        chartInstanceRef.current = chart;
        seriesRef.current = series;

        fetchData().then((data) => {
            if (data && data.length > 0) {
                series.setData(data);
                chart.timeScale().fitContent();
            }
        });

        updateIntervalRef.current = setInterval(updateData, 600); // Update every 1 minute

        return () => {
            clearInterval(updateIntervalRef.current);
            chart.remove();
        };
    }, [selectedCoin]);

    const updateChartDuration = async (duration) => {
        setActiveDuration(duration);
        let interval = '1m';
        if (duration === '1d') {
            interval = '1d';
        } else if (duration === '1w') {
            interval = '1w';
        }
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()}USDT&interval=${interval}&limit=1000`
            );
            const data = await processData(res.data);
            if (chartInstanceRef.current) {
                seriesRef.current.setData(data);
            }
        } catch (error) {
            console.error('Error updating chart duration:', error);
        }
    };

    return (
        <div id="chartDiv">
            <div className="buttonDiv">
                <button
                    onClick={() => updateChartDuration('1m')}
                    className={`durationButton ${activeDuration === '1m' ? 'active' : ''}`}
                >
                    1m
                </button>
                <button
                    onClick={() => updateChartDuration('1d')}
                    className={`durationButton ${activeDuration === '1d' ? 'active' : ''}`}
                >
                    1d
                </button>
                <button
                    onClick={() => updateChartDuration('1w')}
                    className={`durationButton ${activeDuration === '1w' ? 'active' : ''}`}
                >
                    1w
                </button>
            </div>
            <div id="tchart" ref={chartContainerRef} />
        </div>
    );
};

export function TradingChart(props) {
    return <ChartComponent {...props}></ChartComponent>;
}
