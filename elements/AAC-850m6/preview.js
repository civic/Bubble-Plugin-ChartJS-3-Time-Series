function(instance, properties) {
    const img = $('<img src="//dd7tel2830j4w.cloudfront.net/f1628765775656x873226960968038700/chart.svg">')
    	.css({
            opacity: 0.5, 
            width: properties.bubble.width() -50,
            height: properties.bubble.height() -50,
        });
    
	instance.canvas.append($("<div>ChartJS Time Series</div>").append(img));
}