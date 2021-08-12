function(instance, properties, context) {
    console.log("setdata");
    console.log(instance);
    console.log(properties);
    console.log(context);
    const {x_min_max_range} = properties;
	
    const x_values = properties.x_values.get(0, properties.x_values.length()).map(x=>x.getTime());
    const y1_values = properties.y1_values.get(0, properties.y1_values.length())
    const y2_values = properties.y2_values.get(0, properties.y2_values.length())
    
    const dataTemp = x_values.map((x,i) => {return {x, y: y1_values[i]}});
    const dataHumid = x_values.map((x,i) => {return {x, y: y2_values[i]}});
    instance.data.chartData = {dataTemp, dataHumid, x_min_max_range};

	const chart = instance.data.chart;
    chart.reset();
    chart.data.datasets[0].data = dataTemp;
    chart.data.datasets[1].data = dataHumid;
    chart.options.scales.x.min = x_min_max_range ? x_min_max_range[0] : null;
    chart.options.scales.x.max = x_min_max_range ? x_min_max_range[1] : null;
    chart.update();

}