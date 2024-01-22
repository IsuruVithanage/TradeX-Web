import { createChart } from 'lightweight-charts';
import React, { useState, useEffect, useRef } from 'react';
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import './LineChart.css';

export default function LineChart(props) {
	let handleResize = useRef(null);

	const [ chartData, setChartData ] = useState(props.data.daily);
	const [ isFullScreen, setIsFullScreen ] = useState(false);
	const [ activeDuration, setActiveDuration ] = useState('daily');

	const updateChartData = (duration) => {
		setChartData(props.data[duration]);
		setActiveDuration(duration);
	};
	
  	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen);

		if(handleResize.current){
			handleResize.current();
		}
	};

	useEffect(() => {
		const chartDiv = document.getElementById('chart');

		const chart = createChart(chartDiv, {
			width: chartDiv.clientWidth,
			height: chartDiv.clientHeight,

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
					bottom: 0.15,
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
				priceFormatter: price => '$ ' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
			},
		});
		

		chart.addLineSeries({ 
			color: '#21db9a', 
			lineWidth: 2,
			lineType: 2,
			priceLineVisible: false,
			lastValueVisible: false,
			lastPriceAnimation: 1,
		}).setData(chartData);


		chart.timeScale().fitContent();
		

		handleResize.current = () => {
			const chartDiv = document.getElementById('chart');
			chart.applyOptions({ width: chartDiv.clientWidth, height: chartDiv.clientHeight });
		};

		window.addEventListener('resize', handleResize.current);

		return () => {
			window.removeEventListener('resize', handleResize.current);

			chart.remove();
		};
	}, [isFullScreen, chartData] );

	return (
		<div className={`chartContainer ${isFullScreen ? 'full-screen' : ''}`}>
			<div className='button-container'>
				<button 
					onClick={() => updateChartData('daily')} 
					className={`duration-button ${activeDuration === 'daily' ? "active" : ""}`}>
					Day
				</button>

				<button 
					onClick={() => updateChartData('weekly')}
					className={`duration-button ${activeDuration === 'weekly' ? "active" : ""}`}>
					Week
				</button>

				<button 
					onClick={() => updateChartData('monthly')}
					className={`duration-button ${activeDuration === 'monthly' ? "active" : ""}`}>
					Month
				</button>

				<span
					onClick={ toggleFullScreen }
				 	className="full-screen-button" >
					{isFullScreen ? <SlSizeActual size={20} /> : <SlSizeFullscreen size={20}/>}
				</span>
			</div>
			
			<div id="chart"/>

		</div>
	);
};