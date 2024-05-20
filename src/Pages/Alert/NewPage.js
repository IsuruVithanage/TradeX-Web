import React, { useState, useEffect } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage'
import { createChart } from 'lightweight-charts'



export default function NewPage() {
    const [ chartData, setChartData ] = useState([]);
    const [ series, setSeries ] = useState(null);
    const [ newData, setNewData ] = useState([{
        close: 66977.07,
        high: 66977.08,
        low: 66960,
        open: 66977.07,
        time: 1716064600000
    }]);

    const [ upDate, setUpdate ] = useState({
        close: 66977.07,
        high: 66977.08,
        low: 66960,
        open: 66977.07,
        time: 1716064200000
    });
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');


    useEffect(() => {
        if(series){
            setNewData([...newData, upDate]);
            series.update(upDate);
        }
    }, [upDate]);

    useEffect(() => {
        setChartData([
            { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
            { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
            { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
            { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
            { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
            { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
            { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
            { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
            { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
            { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
        ]);


        ws.onopen = () => {
            console.log('WebSocket connection established.');
        };
        
        ws.onmessage = (event) => {
            const priceData = JSON.parse(event.data);
            setUpdate({ 
                time: priceData.E, 
                open: parseFloat(priceData.k.o), 
                high: parseFloat(priceData.k.h), 
                low: parseFloat(priceData.k.l), 
                close: parseFloat(priceData.k.c)
            });

            //console.log(newData);
            console.log(priceData);
        };
        
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };
    }, [])



    useEffect(() => {
		const chartDiv = document.getElementById('chart');

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

			leftPriceScale:{
				visible: true,
				mode: 1,
				textColor: '#ffffff',
				borderVisible: false,
				scaleMargins: {
					top: 0.2,
					bottom: 0.1,
				},
			},

			rightPriceScale:{
				visible: false,
			},

			timeScale:{
				visible: true,
				fixLeftEdge: true,
				fixRightEdge: true,
				borderVisible: false,
				lockVisibleTimeRangeOnResize: true,
                timeVisible: true,	
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
		

		const series = chart.addCandlestickSeries({
            upColor: '#26a69a', 
            downColor: '#ef5350', 
            borderVisible: false,
            wickUpColor: '#26a69a', 
            wickDownColor: '#ef5350',
        });
		
        setSeries(series);
		series.setData(newData);

		return () => {
			chart.remove();
		};
	}, [newData] );




  return (
    <BasicPage tabs={[
        {label: "Spot", path: "/simulate"},
        {label: "Quiz", path: "/quiz"},
        {label: "New", path: "/new" }
    ]}>

    	<div id='chart' style={{width: "100%", height: "500px"}} />
    </BasicPage>

  )
}
