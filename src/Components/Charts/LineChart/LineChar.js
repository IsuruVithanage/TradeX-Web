import {createChart} from 'lightweight-charts';
import React, {useState, useEffect, useRef} from 'react';
import {SlSizeActual, SlSizeFullscreen} from "react-icons/sl";
import './LineChart.css';
import {width} from '@mui/system';
import {set} from 'react-hook-form';
import {Tooltip} from "antd";

export default function LineChart(props) {
    let handleResize = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeDuration, setActiveDuration] = useState('');
    const [hoverInfo, setHoverInfo] = useState(null);
    const [markerTime, setMarkerTime] = useState(props.markerTime);
    const [marker, setMarker] = useState(null);
    const [suggesmarker, setSuggesmarker] = useState(null);


    const updateChartData = (duration) => {
        setChartData(props.data[duration].data);
        setActiveDuration(duration);
    };


    const toggleFullScreen = () => {
        if (handleResize.current) {
            setIsFullScreen(!isFullScreen);
            handleResize.current();
        }
    };


    const timeFormatter = (time, isTimeScale) => {
        const dateValue = (typeof (time) !== 'number') ? time :
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

    function convertTimestampToDateObject(timestamp) {
        const timeZone = new Date().getTimezoneOffset() * 60;

        const date = (timestamp / 1000) - timeZone;

        console.log(date);
        return date;
    }


    useEffect(() => {
        if (props.markerTime !== undefined) {
            setMarkerTime(props.markerTime);
        }
    }, [props.markerTime]);


    useEffect(() => {
        if (props.data && Object.keys(props.data).length > 0) {
            setChartData(props.data[Object.keys(props.data)[0]].data);
            setActiveDuration(Object.keys(props.data)[0]);
        }
    }, [props.data]);


    useEffect(() => {
        setSuggesmarker(null);
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

            leftPriceScale: {
                visible: true,
                mode: 1,
                textColor: '#ffffff',
                borderVisible: false,
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.1,
                },
            },

            rightPriceScale: {
                visible: false,
            },

            timeScale: {
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
                priceFormatter: price => '$ ' + price.toLocaleString('en-US', {minimumFractionDigits: 2}),
                timeFormatter: time => timeFormatter(time, true),
            },
        });


        const series = chart.addAreaSeries({
            color: '#21DB9A',
            topColor: 'rgba(33,219,154,0.16)',
            bottomColor: 'rgba(41,69,59,0.28)',
            lineWidth: 2,
            lineType: props.lineType === undefined ? 0 : props.lineType,
            priceLineVisible: false,
            lastValueVisible: false,
        });


        if (props.isSugges && props.markers) {
            series.setMarkers(props.markers);
        }


        handleResize.current = () => {
            chart.applyOptions({width: chartDiv.clientWidth, height: chartDiv.clientHeight});
        };


        const initializeMarker = () => {
            if (!markerTime) {
                return;
            } else {
                setMarker(null);
                setTimeout(() => {
                    const priceScaleWidth = series.priceScale().width();
                    const x = chart.timeScale().timeToCoordinate(markerTime);
                    const logical = chart.timeScale().coordinateToLogical(x);
                    const price = series.dataByIndex(Math.abs(logical)).value;
                    const y = series.priceToCoordinate(price) + chart.timeScale().height();

                    setMarker(!x ? null : {x: x + priceScaleWidth, y: y + 10});
                    initializeSuggesMarker();
                }, 300);
            }
        };

        const initializeSuggesMarker = () => {
            if (!props.suggestion) {
                return;
            } else {
                setSuggesmarker(null);
                setTimeout(() => {
                    const priceScaleWidth = series.priceScale().width();
                    const x = chart.timeScale().timeToCoordinate(convertTimestampToDateObject(props.suggestion.time));
                    const logical = chart.timeScale().coordinateToLogical(x);
                    const y = series.priceToCoordinate(props.suggestion.bestPrice) + chart.timeScale().height();

                    setSuggesmarker(!x ? null : {x: x + priceScaleWidth, y: y + 10});
                }, 300);
            }
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

            const hoverDiv = document.getElementById('hover-div');
            const chartWidth = chartDiv.clientWidth;
            const chartHeight = chartDiv.clientHeight;
            const hoverDivWidth = hoverDiv ? hoverDiv.offsetWidth : 0;
            const hoverDivHeight = hoverDiv ? hoverDiv.offsetHeight : 0;
            const midPointX = chartWidth / 2;
            const midPointY = chartHeight / 2;
            const coordinateX = chart.timeScale().timeToCoordinate(dataPoint.time) + series.priceScale().width();
            const coordinateY = series.priceToCoordinate(dataPoint.value) + chart.timeScale().height();
            let left, top;

            if (coordinateX < midPointX) {
                left = coordinateX;
            } else {
                left = coordinateX - hoverDivWidth;
            }

            if (coordinateY < midPointY) {
                top = coordinateY;
            } else {
                top = coordinateY - hoverDivHeight;
            }


            setHoverInfo({
                date: timeFormatter(dataPoint.time, false),
                value: dataPoint.value,
                x: left,
                y: top,
            });
        }


        series.setData(chartData);
        chart.timeScale().fitContent();
        chart.timeScale().subscribeVisibleLogicalRangeChange(initializeMarker);
        chart.subscribeCrosshairMove(updateHoverInfo);
        window.addEventListener('resize', handleResize.current);

        return () => {
            window.removeEventListener('resize', handleResize.current);
            chart.unsubscribeCrosshairMove(updateHoverInfo);
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(initializeMarker);
            chart.remove();
        };
    }, [isFullScreen, chartData, markerTime, props.suggestion]);


    return (
        <div className={`chartContainer ${isFullScreen ? 'full-screen' : ''}`} style={props.style}>
            <div className='button-container'>
                {
                    (props.data && Object.keys(props.data).length > 1) &&
                    (Object.keys(props.data).map((duration, index) => (
                        <button
                            key={index}
                            onClick={() => updateChartData(duration)}
                            className={`duration-button ${activeDuration === duration ? "active" : ""}`}>
                            {duration}
                        </button>
                    )))
                }

                <span
                    onClick={toggleFullScreen}
                    className="full-screen-button">
					{isFullScreen ? <SlSizeActual size={20}/> : <SlSizeFullscreen size={20}/>}
				</span>
            </div>

            {chartData.length === 0 && <p className="empty-message">No data to show</p>}

            <div id="chart">
                {hoverInfo && (
                    <div id='hover-div' className="hover-info-div" style={{left: hoverInfo.x, top: hoverInfo.y}}>
                        <span>{hoverInfo.date}</span><br/>
                    </div>
                )}

                {marker && (
                    <Tooltip title="Sugges!" trigger="click" color='#ffb521' open>
                        <div className="marker1" style={{left: marker.x, top: marker.y}}>

                        </div>
                    </Tooltip>

                )}

                {suggesmarker && (
                    <Tooltip title={props.suggestion.bestPrice} trigger="click" color='#0077ff' open>
                        <div className="marker2" style={{left: suggesmarker.x, top: suggesmarker.y}}>

                        </div>
                    </Tooltip>

                )}

            </div>

        </div>
    );
};