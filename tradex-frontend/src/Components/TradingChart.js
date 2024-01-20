import {useEffect, useRef} from "react";
import {ColorType, createChart} from "lightweight-charts";
import io from "socket.io-client";

function TradingChart() {
    const chartContainerRef = useRef();
    let newSeries = useRef();
    let chart = useRef(null);

    useEffect(() => {
        const socket = io("http://localhost:8000");

        // Create the chart and series when the component mounts
        chart.current = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "black" },
                textColor: "#AAA",
            },
            width: 1500,
            height: 500,
            grid: {
                vertLines: {
                    color: "#3C3C3C",
                },
                horzLines: {
                    color: "#3C3C3C",
                },
            },
        });

        newSeries.current = chart.current.addCandlestickSeries({
            upColor: "#21DB9A",
            downColor: "#ff0000",
            borderVisible: false,
            wickUpColor: "#21DB9A",
            wickDownColor: "#ff0000",
        });

        // Listen for "update" events from the socket
        socket.on("update", async (updatedData) => {
            newSeries.current.setData(await processData(updatedData));
        });

        // Clean up chart and series when the component unmounts
        return () => {
            chart.current.remove();
            socket.disconnect();
        };
    }, []);

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

    //Render the chart
    const setChart = () => {
        chart = createChart(chartContainerRef.current, {
            layout: {
                background: {type: ColorType.Solid, color: "black"},
                textColor: "#AAA",
            },
            width: 1500,
            height: 500,
            grid: {
                vertLines: {
                    color: "#3C3C3C",
                },
                horzLines: {
                    color: "#3C3C3C",
                },
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
        newSeries = chart.addCandlestickSeries({
            upColor: "#21DB9A",
            downColor: "#ff0000",
            borderVisible: false,
            wickUpColor: "#21DB9A",
            wickDownColor: "#ff0000",
        });

    };

    return (
        <div>
            <button>Start</button>
            <div ref={chartContainerRef}></div>
        </div>
    );
}

export default TradingChart;
