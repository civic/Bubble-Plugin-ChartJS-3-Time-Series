function(instance, properties, context) {
	const { show_marker, y1_name, y2_name, y1_color, y2_color,
		x_axis_time_unit, x_axis_time_format, y1_axis_range, y2_axis_range } = properties;
	const { y1Data, y2Data, x_min_max_range } = instance.data.chartData ?
		instance.data.chartData : { y1Data: [], y2Data: [], x_min_max_range: null }

	const data = {
		datasets: [
			{
				label: y1_name,
				yAxisID: 'scaleY1',
				backgroundColor: y1_color,
				borderColor: y1_color,
				pointRadius: show_marker ? 3 : 0,
				data: y1Data,
			},
			{
				label: y2_name,
				yAxisID: 'scaleY2',
				backgroundColor: y2_color,
				borderColor: y2_color,
				pointRadius: show_marker ? 3 : 0,
				data: y2Data,
			}
		]
	};
	const displayFormats = {}
	displayFormats[x_axis_time_unit] = x_axis_time_format;
	const scaleX = {
		type: 'time',
		time: {
			unit: x_axis_time_unit,
			displayFormats,
		},
		min: x_min_max_range ? x_min_max_range[0] : null,
		max: x_min_max_range ? x_min_max_range[1] : null
	};

	const scaleY1 = {
		min: y1_axis_range ? y1_axis_range[0] : null,
		max: y1_axis_range ? y1_axis_range[1] : null,
		position: 'left',
		grid: {
			display: true
		},
		ticks: {
			color: y1_color,
		},
		title: {
			display: true,
			text: y1_name
		}
	};
	const scaleY2 = {
		min: y2_axis_range ? y2_axis_range[0] : null,
		max: y2_axis_range ? y2_axis_range[1] : null,
		position: 'right',
		grid: {
			display: true
		},
		ticks: {
			color: y2_color,
		},
		title: {
			display: true,
			text: y2_name
		}
	};
	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					title: function (context) {
						return moment(context[0].parsed.x).format("yyyy-MM-DD HH:mm");
					},
					label: function (context) {
						return context.dataset.label + ":" + Math.round(context.parsed.y)
					}
				}
			}
		},
		scales: { x: scaleX, scaleY1, scaleY2 }
	}
	if (instance.data.chart) {
		instance.data.chart.destroy();
	}
	const chartCanvas = $("<canvas></canvas>").attr({
		width: properties.bubble.width(),
		height: properties.bubble.height()
	});
	$(instance.canvas).empty();
	instance.canvas.append(chartCanvas);

	const chart = new Chart(chartCanvas.get(0), {
		type: 'line',
		data,
		options
	});
	instance.data.chart = chart;
	chart.update();
};
