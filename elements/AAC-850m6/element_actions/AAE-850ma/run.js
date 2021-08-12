function(instance, properties, context) {
    const {x_min_max_range} = properties;
	
    const x_values = properties.x_values.get(0, properties.x_values.length());
    const y1_values = properties.y1_values.get(0, properties.y1_values.length())
    const y2_values = properties.y2_values.get(0, properties.y2_values.length())
    
    const y1Data = x_values.map((x,i) => {return {x, y: y1_values[i]}});
    const y2Data = x_values.map((x,i) => {return {x, y: y2_values[i]}});
    instance.data.chartData = {y1Data, y2Data, x_min_max_range};

	const chart = instance.data.chart;
    chart.reset();
    chart.data.datasets[0].data = y1Data;
    chart.data.datasets[1].data = y2Data;
    chart.options.scales.x.min = x_min_max_range ? x_min_max_range[0] : null;
    chart.options.scales.x.max = x_min_max_range ? x_min_max_range[1] : null;
    chart.update();

}