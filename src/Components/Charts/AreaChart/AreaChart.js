import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef} from 'react';

export default function AreaChart(props) {
	const {
		data,
		colors: {
			backgroundColor = '#0E0E0F',
			lineColor = '#21db9a',
			textColor = '#ffffff',
			areaTopColor = '#21db9a00',
			areaBottomColor = '#21db9a00',

		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});

			chart.applyOptions({
				// rightPriceScale: {
				// 	visible: 'false',
				// },
				leftPriceScale: {
					visible: 'true',
				},
			});

			chart.priceScale('right').applyOptions({
				visible: false,
			});
			
			chart.timeScale().fitContent();

			chart.applyOptions({
				grid: {
					vertLines: {
						color: '#3C3C3C',
					},
					horzLines: {
						color: '#3C3C3C',
					},
				},
			});

			
			
			

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};