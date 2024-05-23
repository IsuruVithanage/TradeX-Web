import React, { useEffect, useRef, useState } from 'react';
import './TradingChart.css';
import { ColorType, createChart } from 'lightweight-charts';
import axios from 'axios';
import symbols from "../../Assets/Images/Coin Images.json";

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
            const latestTime = res.data[res.data.length - 1][0];
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
                visible: false,
            }
        });

        const series = chart.addCandlestickSeries({
            upColor,
            downColor,
            borderVisible: false,
            wickUpColor,
            wickDownColor
        });

        const toolTipWidth = 150;
        const toolTipHeight = 80;
        const toolTipMargin = 15;

        const container = chartContainerRef.current;

        if (container) {
            const toolTip = document.createElement('div');
            toolTip.style = `width: 150px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 10px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
            toolTip.style.background = 'black';
            toolTip.style.color = 'white';
            toolTip.style.borderColor = '#21DB9A';
            container.appendChild(toolTip);

            chart.subscribeCrosshairMove(param => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none';
                } else {
                    const dateStr = new Date(param.time * 1000); // Convert to milliseconds
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(dateStr);

                    toolTip.style.display = 'block';
                    const data = param.seriesData.get(series);
                    const price = data.value !== undefined ? data.value : data.close;
                    const formattedPrice = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(price);
                    toolTip.innerHTML = `<div style="color: ${'#21DB9A'}">${symbols[selectedCoin.symbol].name}</div><div style="font-size: 20px; margin: 4px 0px; color: ${'white'}">
                    ${formattedPrice}
                    </div><div style="color: ${'white'}">
                    ${formattedDate}
                    </div>`;

                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth - toolTipWidth) {
                        left = param.point.x - toolTipMargin - toolTipWidth;
                    }

                    let top = y + toolTipMargin;
                    if (top > container.clientHeight - toolTipHeight) {
                        top = y - toolTipHeight - toolTipMargin;
                    }
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            });
        }

        chartInstanceRef.current = chart;
        seriesRef.current = series;

        fetchData().then((data) => {
            if (data && data.length > 0) {
                series.setData(data);
                chart.timeScale().fitContent();
            }
        });

        updateIntervalRef.current = setInterval(updateData, 600);

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
