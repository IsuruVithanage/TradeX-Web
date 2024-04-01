import { createChart } from 'lightweight-charts';
import React, { useState, useEffect, useRef } from 'react';
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import './LineChart.css';
import * as LightweightCharts from "lightweight-charts";

export default function LineChart(props) {
	let handleResize = useRef(null);
	const [ timeVisible, setTimeVisible ] = useState(false)
	const [ chartData, setChartData ] = useState([]);
	const [ isFullScreen, setIsFullScreen ] = useState(false);
	const [ activeDuration, setActiveDuration ] = useState('');

	const markers = [
		{
			time: { year: 2024, month: 4, day: 27 },
			position: 'aboveBar',
			color: '#ffbf74',
			shape: 'arrowDown',
			text: 'A',
		},
	];

	useEffect(() => {
		activeDuration && props.data[activeDuration].length > 0 &&
		typeof(props.data[activeDuration][0].time) === 'number' ? 
		setTimeVisible(true) : setTimeVisible(false);
	}, [activeDuration, props.data])

	useEffect(() => {
		if(props.data && Object.keys(props.data).length > 0){
			setChartData(props.data[Object.keys(props.data)[0]]);
			setActiveDuration(Object.keys(props.data)[0]);
		}
	}, [props.data]);

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

			handleScale: {
				mouseWheel: isFullScreen,	
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
				timeVisible: timeVisible,
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
				// locale: 'en-US',
			},
		});
		

		const series=chart.addLineSeries({
			color: '#21db9a', 
			lineWidth: 2,
			lineType: 2,
			priceLineVisible: false,
			lastValueVisible: false,
			lastPriceAnimation: 1,
		});

		series.setData(chartData);



		chart.timeScale().fitContent();
		if (props.isSugges) {
			series.setMarkers(markers);
		}
		

		handleResize.current = () => {
			const chartDiv = document.getElementById('chart');
			chart.applyOptions({ width: chartDiv.clientWidth, height: chartDiv.clientHeight });
		};

		window.addEventListener('resize', handleResize.current);

		return () => {
			window.removeEventListener('resize', handleResize.current);

			chart.remove();
		};
	}, [isFullScreen, chartData, timeVisible] );

	return (
		<div className={`chartContainer ${isFullScreen ? 'full-screen' : ''}`}>
			<div className='button-container'>
				{ 	 
					( props.data && Object.keys(props.data).length > 1  ) && 
					( Object.keys(props.data).map((duration, index) => (
						<button 
							key={index}
							onClick={() => updateChartData(duration)} 
							className={`duration-button ${activeDuration === duration ? "active" : ""}`}>
							{duration}
						</button>
					)))
				}	

				<span
					onClick={ toggleFullScreen }
				 	className="full-screen-button" >
					{isFullScreen ? <SlSizeActual size={20} /> : <SlSizeFullscreen size={20}/>}
				</span>
			</div>

			{ chartData.length === 0 && <p className="empty-message">No data to show</p>}
			
			<div id="chart"/>

		</div>
	);
};