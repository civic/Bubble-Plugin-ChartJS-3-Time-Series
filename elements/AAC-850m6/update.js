function(instance, properties, context) {
	console.log("update");
	console.log(instance);
	console.log(properties);
	console.log(context);

	const { show_marker, y1_name, y2_name, y1_color, y2_color,
		x_axis_time_unit, x_axis_time_format, y1_axis_range, y2_axis_range } = properties;
	const { dataTemp, dataHumid, x_min_max_range } = instance.data.chartData ?
		instance.data.chartData : { dataTemp: [], dataHumid: [], x_min_max_range: null }

	const data = {
		datasets: [
			{
				label: y1_name,
				yAxisID: 'y1',
				backgroundColor: y1_color,
				borderColor: y1_color,
				pointRadius: show_marker ? 3 : 0,
				data: dataTemp,
			},
			{
				label: y2_name,
				yAxisID: 'y2',
				backgroundColor: y2_color,
				borderColor: y2_color,
				pointRadius: show_marker ? 3 : 0,
				data: dataHumid,
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
	console.log(scaleX);

	const y1 = {
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
	const y2 = {
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
		scales: { x: scaleX, y1, y2 }
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
