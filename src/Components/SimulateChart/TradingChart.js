import {createChart, ColorType} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import io from "socket.io-client";

export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = '#0E0E0F',
            textColor = '#AAA',
            upColor= "#21DB9A",
            downColor= "#ff0000",
            wickUpColor= "#21DB9A",
            wickDownColor= "#ff0000",
        } = {},
    } = props;

    const chartContainerRef = useRef();

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

            const socket = io("http://localhost:8000");
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {type: ColorType.Solid, color: backgroundColor},
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
                grid: {
                    vertLines: {
                        color: "#3C3C3C",
                    },
                    horzLines: {
                        color: "#3C3C3C",
                    },
                },
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
                newSeries.setData(await processData(updatedData));
            });


            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        []
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

export function TradingChart(props) {
    return (
        <ChartComponent {...props}></ChartComponent>
    );
}