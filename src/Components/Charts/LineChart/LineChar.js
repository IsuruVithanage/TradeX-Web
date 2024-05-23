import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import './LineChart.css';


export default function LineChart(props) {
	// let handleResize = useRef(null);
	const [ update, setUpdate ] = useState(false);
	const [ chart, setChart ] = useState(null);
	const [ chartData, setChartData ] = useState([]);
	const [ isFullScreen, setIsFullScreen ] = useState(false);
	const [ activeDuration, setActiveDuration ] = useState('');
	const { data, markerTime, markerTime2, lineType } = props;


	const updateChartData = (duration) => {
		setChartData(data[duration].data);
		setActiveDuration(duration);
	};


  	const toggleFullScreen = () => {
		if(handleResize){
			setIsFullScreen(!isFullScreen);
			handleResize();
		}
	};


	const handleResize = () => {
		if(chart){
			chart.resize(document.getElementById('chart').clientWidth, document.getElementById('chart').clientHeight);
			setUpdate(!update);
			// setHandleResize(() => {
			// 	chart.applyOptions({ width: chartDiv.clientWidth, height: chartDiv.clientHeight });
			// });
    }
	};

	function convertTimestampToDateObject(timestamp) {
		const timeZone = new Date().getTimezoneOffset() * 60;

		const date = (timestamp / 1000) - timeZone;

		console.log(date);
		return date;
	}


	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [chart]);




	useEffect(() => {
		if(data && Object.keys(data).length > 0){
			setChartData(data[Object.keys(data)[0]].data);
			setActiveDuration(Object.keys(data)[0]);
		}
	}, [data]);



	useEffect(() => {
		setSuggesmarker(null);
		const chartDiv = document.getElementById('chart');
		const toolTip = document.createElement('div');
		const actualMarker = document.createElement('div');
		const bestMarker = document.createElement('div');

		toolTip.classList = 'tool-tip';
		actualMarker.classList = 'marker actual-marker';
		bestMarker.classList = 'marker best-marker';

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
					labelVisible: false,
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


		handleResize.current = () => {
			chart.applyOptions({ width: chartDiv.clientWidth, height: chartDiv.clientHeight });
		};


		const initializeMarker = () => {
			actualMarker.style.display = 'none';
			bestMarker.style.display = 'none';

			if (!markerTime || !markerTime2) {
				return;
			} else {
				setTimeout(() => {
					let priceScaleWidth = 0;
					try { priceScaleWidth = series.priceScale().width(); }
					catch {	console.log("error handled in marker"); }

					const chartMargin = chartDiv.computedStyleMap().get('padding-top').value;

					const actualX = chart.timeScale().timeToCoordinate(markerTime);
					const actualL = chart.timeScale().coordinateToLogical(actualX);
					const actualPrice = series.dataByIndex(Math.abs(actualL)).value;
					const actualY = series.priceToCoordinate(actualPrice) + chartMargin;

					const bestX = chart.timeScale().timeToCoordinate(markerTime2);
					const bestL = chart.timeScale().coordinateToLogical(bestX);
					const bestPrice = series.dataByIndex(Math.abs(bestL)).value;
					const bestY = series.priceToCoordinate(bestPrice) + chartMargin;

					if (actualX > 0) {
						actualMarker.style.display	= 'block';
						actualMarker.style.left		= actualX + priceScaleWidth + 'px';
						actualMarker.style.top		= actualY + 'px';
					}

					if (bestX > 0) {
						bestMarker.style.display	= 'block';
						bestMarker.style.left 		= bestX + priceScaleWidth + 'px';
						bestMarker.style.top 		= bestY + 'px';
					}
				}, 300);
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

			const chartMargin = chartDiv.computedStyleMap().get('padding-top').value;
			const chartWidth = chartDiv.clientWidth;
			const chartHeight = chartDiv.clientHeight;

			const price = param.seriesData.get(series).value;
			const timeZone = new Date().getTimezoneOffset() * 60 * 1000;

			const dateStr = new Date(param.time * 1000 + timeZone).toLocaleString('en-GB',  
				(!data[activeDuration].showTime) ? {
					dateStyle: "long"
		
				} : {
					dateStyle: "long",
					hourCycle: "h12",
					timeStyle: "short",
					
				});
			
			const toolTipWidth = toolTip.offsetWidth;
			const toolTipHeight = toolTip.offsetHeight;
			const toolTipMargin = 45;

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
			toolTip.style.left = coordinateX + 'px';
			toolTip.style.top = coordinateY + 'px';
			toolTip.innerHTML = 
			`
				<div>
					<div style="color: ${'#21db9a'}">TradeX</div>
					<div style="font-size: 24px; margin: 4px 0px; color: white">
						$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4})}
					</div>
					<div style="color: #ffffffbb">
						${dateStr}
					</div>
				</div>
			`;

			if (markerTime === param.time) {
				toolTip.style.borderColor = '#ffb521';

			} else if (markerTime2 === param.time) {
				toolTip.style.borderColor = '#ff0000';

			} else {
				toolTip.style.borderColor = '#21db9a';

			}
		}

		
		chartData && series.setData(chartData);
		chart.timeScale().fitContent();
		chart.timeScale().subscribeVisibleLogicalRangeChange(initializeMarker);
		chart.subscribeCrosshairMove(updateToolTip);
		setChart(chart);
		chartDiv.appendChild(toolTip);
		chartDiv.appendChild(actualMarker);
		chartDiv.appendChild(bestMarker);

		return () => {
			// window.removeEventListener('resize', handleResize);
			chartDiv.removeChild(toolTip);
			chartDiv.removeChild(actualMarker);
			chartDiv.removeChild(bestMarker);
			chart.unsubscribeCrosshairMove(updateToolTip);
			chart.timeScale().unsubscribeVisibleLogicalRangeChange(initializeMarker);
			chart.remove();
		};
	}, [isFullScreen, lineType, chartData, markerTime, markerTime2, activeDuration, data, update] );




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