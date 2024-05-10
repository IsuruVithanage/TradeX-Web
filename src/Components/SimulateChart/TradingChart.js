import React, {useEffect, useRef, useState} from 'react';
import './TradingChart.css';
import {ColorType, createChart} from 'lightweight-charts';
import axios from 'axios';

export const ChartComponent = (props) => {
    const [activeDuration, setActiveDuration] = useState('1m');
    const [chartInstance, setChartInstance] = useState(null);
    const chartContainerRef = useRef(null);
    const [updatedData, setUpdatedData] = useState({
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        time: 0,
    });

    let i=400;

    const [temp, setTemp] = useState({
        open: 69456.45-i,
        high: 69888.65-i,
        low: 69233.33-i,
        close: 69784.55-i,
        time: 177488578499+i,
    });


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
            console.log("this",transformedData)

            return transformedData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${
                    selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()
                }USDT&interval=1m&limit=1000`
            );
            const latestPrice = parseFloat(res.data[res.data.length - 1][4]);
            const latestTime = parseFloat(res.data[res.data.length - 1][0]);
            updateLastPrice(latestPrice,latestTime);
            return processData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async () => {
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${
                    selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()
                }USDT&interval=1m&limit=1`
            );
            const result= processData(res.data);
            result.then((resultArray) => {
                console.log("result",resultArray[0])
                return resultArray[0];
            });
        } catch (error) {
            console.log(error);
        }
    };

    /*useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:443/ws/btcusdt@kline_1s`);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const time = (data.k.t) / 1000;
            setUpdatedData(prevOrder => ({
                ...prevOrder,
                time: time,
                open: parseFloat(data.k.o),
                high: parseFloat(data.k.h),
                low: parseFloat(data.k.l),
                close: parseFloat(data.k.c),
            }));

            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${
                    selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()
                }USDT&interval=1m&limit=1`
            );

            const result = await processData(res.data);
            console.log("re",result)


            setTemp(prevOrder => ({
                ...prevOrder,
                open: result[0].open,
                high: result[0].high,
                low: result[0].low,
                close: result[0].close,
                time: result[0].time,
            }));
        };

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        console.log(temp);
    }, [updatedData]);*/


    const initializeChart = async () => {
        if (chartInstance) {
            chartInstance.remove();
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
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

        chart.timeScale().fitContent();

        const newSeries = chart.addCandlestickSeries({
            upColor,
            downColor,
            borderVisible: false,
            wickUpColor,
            wickDownColor
        });

        newSeries.setData(await fetchData());



        // Set interval to fetch and update data every 5 seconds
       /* const intervalId = setInterval(async () => {
            newSeries.update(await updateData());
        }, 1000);*/

        setChartInstance(chart);

        return () => {
            //clearInterval(intervalId);
            if (chart) {
                chart.remove();
            }
        };
    };

    useEffect(() => {
        if (selectedCoin) {
            initializeChart();
        }

    }, [selectedCoin]);

    const updateChartDuration = async (duration) => {
        setActiveDuration(duration);
        let interval = '1m';
        if (duration === '1m') {
            interval = '1m';
        } else if (duration === '1d') {
            interval = '1d';
        } else if (duration === '1w') {
            interval = '1w';
        }
        try {
            const res = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${
                    selectedCoin === null ? 'BTC' : selectedCoin.symbol.toUpperCase()
                }USDT&interval=${interval}&limit=1000`
            );
            const data = await processData(res.data);
            if (chartInstance && !chartInstance.isDisposed()) {
                chartInstance.series.setData(data);
            }
        } catch (error) {
            console.log(error);
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
