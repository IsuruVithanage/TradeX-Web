import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import './LineChart.css';


export default function LineChart(props) {
	let handleResize = useRef(null);
	const [ chartData, setChartData ] = useState(null);
	const [ isFullScreen, setIsFullScreen ] = useState(false);
	const [ activeDuration, setActiveDuration ] = useState('');
	const { data, currentMarkerTime, suggestMarkerTime, title, lineType } = props;


	const updateChartData = (duration) => {
		setChartData(data[duration].data);
		setActiveDuration(duration);
	};


  	const toggleFullScreen = () => {
		if(handleResize.current){
			setIsFullScreen(!isFullScreen);
			handleResize.current();
		}
	};


	useEffect(() => {
		if(data && Object.keys(data).length > 0){
			setChartData(data[Object.keys(data)[0]].data);
			setActiveDuration(Object.keys(data)[0]);
		}
	}, [data]);



	useEffect(() => {
		const chartDiv = document.getElementById('chart');
		const toolTip = document.createElement('div');
		const currentMarker = document.createElement('div');
		const suggestMarker = document.createElement('div');

		toolTip.classList = 'tool-tip';
		currentMarker.classList = 'marker current-marker';
		suggestMarker.classList = 'marker suggest-marker';

		const chart = createChart(chartDiv, {
			width: chartDiv.clientWidth,
			height: chartDiv.clientHeight,

			handleScale: {
				mouseWheel: isFullScreen,
			},

			crosshair: {
				vertLine: {
					style: 0,
					width: 1.3,
					visible: !chartData ? false : true,
				},
				horzLine: {
					labelBackgroundColor: '#000000',
					color: '#FFFFFF60',
					style: 2,
				},
			},

			leftPriceScale:{
				visible: !chartData ? false : true,
				mode: 1,
				textColor: 'rgba( 255, 255, 255, 0.7)',
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
				visible: false,
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
			},
		});


		const series = chart.addAreaSeries({
			lineColor: '#21db9a', 
			topColor: 'rgba(20, 140, 101, 1)',
      		bottomColor: 'rgba( 0, 0, 0, 0.4)',
			lineWidth: 2,
			lineType: lineType === undefined ? 0 : lineType,
			priceLineVisible: false,
			lastValueVisible: false,
		});



		const initializeMarkers = () => {
			currentMarker.style.display = 'none';
			suggestMarker.style.display = 'none';

			if (!currentMarkerTime || !suggestMarkerTime) {
				return;
			} else {
				setTimeout(() => {
					setMarkers(currentMarkerTime, currentMarker);
					setMarkers(suggestMarkerTime, suggestMarker);
				}, 300);

				let priceScaleWidth = 0;
				try { priceScaleWidth = series.priceScale().width(); }
				catch {	console.log("error handled in marker"); }

				const chartMargin = chartDiv.computedStyleMap().get('padding-top').value;

				const setMarkers = (time, marker) => {
					const coordinateX = chart.timeScale().timeToCoordinate(time);
					const logical = chart.timeScale().coordinateToLogical(coordinateX);
					const price = series.dataByIndex(Math.abs(logical)).value;
					const coordinateY = series.priceToCoordinate(price) + chartMargin;

					if (coordinateX > 0) {
						marker.style.display = 'block';
						marker.style.top = coordinateY + 'px';
						marker.style.left  = coordinateX + priceScaleWidth + 'px';
					}
				}
			}
		};


		const updateToolTip = (param) => {
			if (!param.time || param.seriesData === undefined) {
				toolTip.style.display = 'none';
                return;
            }

			let priceScaleWidth = 0;
				try { priceScaleWidth = series.priceScale().width(); }
				catch {	console.log("error handled in toolTip"); }

			const color = 
				(param.time === currentMarkerTime) ? '#FFD700' :
				(param.time === suggestMarkerTime) ? '#0077FF' : '#21DB9A';

			const dateStr = new Date(param.time * 1000).toLocaleString('en-GB',  
				(!data[activeDuration].showTime) ? {
					dateStyle: "long"
		
				} : {
					dateStyle: "long",
					hourCycle: "h12",
					timeStyle: "short",
					
				});

			const chartMargin = chartDiv.computedStyleMap().get('padding-top').value;
			const chartWidth = chartDiv.clientWidth;
			const chartHeight = chartDiv.clientHeight;

			const toolTipWidth = toolTip.offsetWidth;
			const toolTipHeight = toolTip.offsetHeight;
			const toolTipMargin = 45;
			
			const price = param.seriesData.get(series).value;
			const pointX = param.point.x + priceScaleWidth - (toolTipWidth / 2);
			const pointY = series.priceToCoordinate(price) + chartMargin;

			const coordinateX = 
				(pointX < priceScaleWidth + 5) ? priceScaleWidth + 5 : 
				(pointX + toolTipWidth < chartWidth) ? pointX   : 
				(chartWidth - (toolTipWidth + 5));

			const coordinateY =
				pointY - (toolTipHeight + toolTipMargin) > chartHeight / 5 ? 
				pointY - (toolTipHeight + toolTipMargin)  : 
				pointY + toolTipMargin ;


			toolTip.style.display = 'block';
			toolTip.style.borderColor = color;
			toolTip.style.left = coordinateX + 'px';
			toolTip.style.top = coordinateY + 'px';
			toolTip.innerHTML = 
			`
				<div>
					<div style="color: ${color}">${title || 'TradeX'}</div>
					<div style="font-size: 24px; margin: 4px 0px; color: white">
						$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4})}
					</div>
					<div style="color: #ffffffbb">
						${dateStr}
					</div>
				</div>
			`;
		}


		handleResize.current = () => {
			chart.applyOptions({ 
				width: chartDiv.clientWidth, 
				height: chartDiv.clientHeight 
			});

			initializeMarkers();
		};

		
		chartData && series.setData(chartData);
		chart.timeScale().fitContent();
		chart.timeScale().subscribeVisibleLogicalRangeChange(initializeMarkers);
		chart.subscribeCrosshairMove(updateToolTip);
		chartDiv.appendChild(toolTip);
		chartDiv.appendChild(currentMarker);
		chartDiv.appendChild(suggestMarker);
		window.addEventListener('resize', handleResize.current);

		return () => {
			window.removeEventListener('resize', handleResize.current);
			chartDiv.removeChild(toolTip);
			chartDiv.removeChild(currentMarker);
			chartDiv.removeChild(suggestMarker);
			chart.unsubscribeCrosshairMove(updateToolTip);
			chart.timeScale().unsubscribeVisibleLogicalRangeChange(initializeMarkers);
			chart.remove();
		};
	}, [ isFullScreen, lineType, chartData, currentMarkerTime, suggestMarkerTime, activeDuration, data, title ] );




	return (
		<div className={`chartContainer ${isFullScreen ? 'full-screen' : ''}`} style={props.style}>
			<div className='button-container'>
				{ 	 
					( data && Object.keys(data).length > 1  ) && 
					( Object.keys(data).map((duration, index) => (
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

			{ !chartData && <p className="empty-message">No data to show</p>}

			<div id="chart"/>
		</div>
	);
};