import {createChart, ColorType} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import io from "socket.io-client";
import './TradingChart.css'

export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = '#0E0E0F',
            textColor = '#0E0E0F',
            upColor = "#21DB9A",
            downColor = "#ff0000",
            wickUpColor = "#21DB9A",
            wickDownColor = "#ff0000",
        } = {},
    } = props;

    //Process the data according to the graph
    const processData = async (newData) => {
        try {
            const response = newData;
            console.log(response);

            const transformedData = response.map((item) => ({
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

    useEffect(
        () => {
            const chartContainerRef = document.getElementById('tchart');

            const socket = io("http://localhost:8000");
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.clientWidth,height:chartContainerRef.clientHeight});
            };

            const chart = createChart(chartContainerRef, {
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
                rightPriceScale:{
                    borderVisible:false,
                    textColor:"#AAA",
                },
                localization:{
                  priceFormatter: price => '$ ' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                },
                timeScale:{
                    fixLeftEdge:true,
                    borderVisible:false,
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

            // Listen for "update" events from the socket
            socket.on("update", async (updatedData) => {
                if (!chart) {
                    return;
                }
                newSeries.setData(await processData(updatedData));
            });


            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                if (chart) {
                    chart.remove();
                }
            };
        },
        []
    );

    return (

        <div id='chartDiv'>
            <div id="tchart"/>
        </div>
    );
};

export function TradingChart(props) {
    return (
        <ChartComponent {...props}></ChartComponent>
    );
}