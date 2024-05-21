import { createChart } from 'lightweight-charts';
import React, { useState, useEffect, useRef } from 'react';
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import './LineChart.css';

export default function LineChart(props) {
	let handleResize = useRef(null);
	const [ chartData, setChartData ] = useState([]);
	const [ isFullScreen, setIsFullScreen ] = useState(false);
	const [ activeDuration, setActiveDuration ] = useState('');
	const [ hoverInfo, setHoverInfo ] = useState(null);

	const updateChartData = (duration) => {
		setChartData(props.data[duration].data);
		setActiveDuration(duration);
	};


  	const toggleFullScreen = () => {
		if(handleResize.current){
			setIsFullScreen(!isFullScreen);
			handleResize.current();
		}
	};



	const timeFormatter = (time, isTimeScale) => {
		const dateValue = (typeof(time) !== 'number') ? time :
		time * 1000 + new Date().getTimezoneOffset() * 60 * 1000;

		const options = (isTimeScale) ? 
		(!props.data[activeDuration].showTime) ? {
			dateStyle: "medium"

		} : {
			dateStyle: "short",
			hourCycle: "h12",
			timeStyle: "short",

		} : (!props.data[activeDuration].showTime) ? {
			dateStyle: "long"

		} : {
			dateStyle: "long",
			hourCycle: "h12",
			timeStyle: "short",
			
		};

		return new Date(dateValue).toLocaleString('en-GB', options).replace(/\//g, '-'); 
	};



	useEffect(() => {
		if(props.data && Object.keys(props.data).length > 0){
			setChartData(props.data[Object.keys(props.data)[0]].data);
			setActiveDuration(Object.keys(props.data)[0]);
		}
	}, [props.data]);

	

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
				timeFormatter: time => timeFormatter(time, true),
			},
		});
		

		const series = chart.addAreaSeries({
			color: '#21DB9A', 
			areaTopColor: '#21DB9A',
            areaBottomColor: '#21DB9A47',
			lineWidth: 2,
			lineType: props.lineType === undefined ? 0 : props.lineType,
			priceLineVisible: false,
			lastValueVisible: false,
			lastPriceAnimation: 1,
		});


		if (props.isSugges && props.markers) {
			series.setMarkers(props.markers);
		}
		

		handleResize.current = () => {
			chart.applyOptions({ width: chartDiv.clientWidth, height: chartDiv.clientHeight });
		};


		const updateHoverInfo = (param) => {
			if (!param.time || param.seriesData === undefined) {
                setHoverInfo(null);
                return;
            }

			const dataPoint = param.seriesData.values().next().value;
			
            if (dataPoint === null) {
				setHoverInfo(null);
                return;
            }

			const coordinateX = chart.timeScale().timeToCoordinate(dataPoint.time) + series.priceScale().width();
			const coordinateY = series.priceToCoordinate(dataPoint.value) + chart.timeScale().height();

			setHoverInfo({
				date: timeFormatter(dataPoint.time, false),
				value: dataPoint.value,
				x: coordinateX,
				y: coordinateY,
			});	
		}

		series.setData(chartData);
		chart.timeScale().fitContent();
		chart.subscribeCrosshairMove(updateHoverInfo);
		window.addEventListener('resize', handleResize.current);

		return () => {
			window.removeEventListener('resize', handleResize.current);
			chart.unsubscribeCrosshairMove(updateHoverInfo);
			chart.remove();
		};
	}, [isFullScreen, chartData] );



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
			
			<div id="chart">
				{hoverInfo && (
					<div className="hover-info-div" style={{left: hoverInfo.x, top: hoverInfo.y }}>
						{hoverInfo.date}
					</div>
				)}
			</div>

		</div>
	);
};