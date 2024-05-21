import React, { useState, useEffect } from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

export default function NewPage() {
    const [chartData, setChartData] = useState([]);
    const [series, setSeries] = useState(null);
    const [newData, setNewData] = useState([{
        close: 66977.07,
        high: 66977.08,
        low: 66960,
        open: 66977.07,
        time: 1716064600000
    }]);

    const [upDate, setUpdate] = useState(null);

    useEffect(async() => {
        const min = await axios.get(
            `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=180`
        );

        const timeZone = new Date().getTimezoneOffset() * 60;

        const initialData = min.data.map((data) => ({
            time: (data[0] / 1000) - timeZone,
            open: parseFloat(data[1]),
            high: parseFloat(data[2]),
            low: parseFloat(data[3]),
            close: parseFloat(data[4])
        }));

        setChartData(initialData);
    }, []);

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

        ws.onopen = () => {
            console.log('WebSocket connection established.');
        };

        ws.onmessage = (event) => {
            const priceData = JSON.parse(event.data);
            setUpdate({
                time: priceData.k.t,
                open: parseFloat(priceData.k.o),
                high: parseFloat(priceData.k.h),
                low: parseFloat(priceData.k.l),
                close: parseFloat(priceData.k.c)
            });
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            if (ws){
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        if (series) {
            const lastData = newData.pop();
            if (lastData.time === upDate.time) {
                setNewData([...newData, upDate]);
                series.update(upDate);
            } else {
                setNewData([...newData, lastData, upDate]);
                series.update(upDate);
            }
        }
    }, [upDate]);


    useEffect(() => {
        const chartDiv = document.getElementById('chart1');

        if (!chartDiv) return;

        const chart = createChart(chartDiv, {
            width: chartDiv.clientWidth,
            height: chartDiv.clientHeight,
            handleScale: {
                mouseWheel: true,
            },
            crosshair: {
                vertLine: {
                    labelBackgroundColor: '#3c3c3c',
                },
                horzLine: {
                    labelBackgroundColor: '#3c3c3c',
                },
            },
            leftPriceScale: {
                visible: false,
            },
            rightPriceScale: {
                visible: true,
                mode: 1,
                textColor: '#ffffff',
                borderVisible: false,
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.1,
                },
            },
            timeScale: {
                visible: true,
                fixLeftEdge: true,
                fixRightEdge: true,
                borderVisible: false,
                lockVisibleTimeRangeOnResize: true,
                timeVisible: true,
                rightOffset: 10,
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: '#3C3C3C',
                },
            },
            layout: {
                background: {
                    color: '#0E0E0F'
                },
            },
            localization: {
                priceFormatter: price => '$ ' + price.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            },
        });
        
        console.log(chart);

        const series = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        setSeries(series);
        series.setData(chartData);

        return () => {
            if (chart) {
                chart.remove();
            }
        };
    }, [chartData]);

    return (
        <BasicPage tabs={[
            { label: "Spot", path: "/simulate" },
            { label: "Quiz", path: "/quiz" },
            { label: "New", path: "/new" }
        ]}>
            <div id='chart1' style={{ width: "100%", height: "500px" }} />
        </BasicPage>
    );
}
