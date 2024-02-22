import {ColorType, createChart} from 'lightweight-charts';
import React, {useEffect, useState} from 'react';
import './TradingChart.css';
import axios from "axios";

export const ChartComponent = props => {
    const [activeDuration, setActiveDuration] = useState('daily');
    const [chart, setChart] = useState(null);
    const {
        selectedCoin,
        colors: {
            backgroundColor = '#0E0E0F',
            textColor = '#0E0E0F',
            upColor = "#21DB9A",
            downColor = "#ff0000",
            wickUpColor = "#21DB9A",
            wickDownColor = "#ff0000",
        } = {},
    } = props;
    console.log(selectedCoin);


    //Process the data according to the graph
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
            console.error("Error fetching data:", error);
        }
    }

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${selectedCoin === null ? "BTC" : selectedCoin.symbol.toUpperCase()}USDT&interval=1m&limit=1000`
            );
            return processData(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const renderChart = () => {
        const chartContainerRef = document.getElementById('tchart');

        return createChart(chartContainerRef, {
            layout: {
                background: {type: ColorType.Solid, color: backgroundColor},
                textColor,
            },
            width: chartContainerRef.clientWidth,
            height: chartContainerRef.clientHeight,
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: "#3C3C3C",
                },
            },
            rightPriceScale: {
                borderVisible: false,
                textColor: "#AAA",
            },
            localization: {
                priceFormatter: price => '$ ' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            },
            timeScale: {
                fixLeftEdge: true,
                borderVisible: false,
            }
        });
    }

    const fetchDataAndRenderChart = async () => {
        const chartContainerRef = document.getElementById('tchart');
        if (chart) {
            // If a chart already exists, remove it before creating a new one
            chart.remove();
        }

        const newChart = renderChart();
        setChart(newChart);
        newChart.timeScale().fitContent();
        const handleResize = () => {
            newChart.applyOptions({
                width: chartContainerRef.clientWidth,
                height: chartContainerRef.clientHeight,
            });
        };

        const newSeries = newChart.addCandlestickSeries({
            upColor,
            downColor,
            borderVisible: false,
            wickUpColor,
            wickDownColor,
        });

        newSeries.setData(await fetchData());

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            newChart.removeSeries(newSeries);
            newChart.remove();
        };
    };



    useEffect(() => {
        fetchDataAndRenderChart();
    }, [selectedCoin]);


    function updateChartData(daily) {

    }

    return (

        <div id='chartDiv'>
            <div className='buttonDiv'>
                <button
                    onClick={() => updateChartData('daily')}
                    className={`durationButton ${activeDuration === 'daily' ? "active" : ""}`}>
                    1m
                </button>

                <button
                    onClick={() => updateChartData('weekly')}
                    className={`durationButton ${activeDuration === 'weekly' ? "active" : ""}`}>
                    15m
                </button>

                <button
                    onClick={() => updateChartData('monthly')}
                    className={`durationButton ${activeDuration === 'monthly' ? "active" : ""}`}>
                    1H
                </button>
                <button
                    onClick={() => updateChartData('monthly')}
                    className={`durationButton ${activeDuration === 'monthly' ? "active" : ""}`}>
                    1D
                </button>
                <button
                    onClick={() => updateChartData('monthly')}
                    className={`durationButton ${activeDuration === 'monthly' ? "active" : ""}`}>
                    1W
                </button>

            </div>


            <div id='tchart'/>
        </div>
    );
};

export function TradingChart(props) {
    return (
        <ChartComponent {...props}></ChartComponent>
    );
}