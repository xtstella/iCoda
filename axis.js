function updateScale() {

	timeAxis_horizontal = !timeAxis_horizontal;

	if (timeAxis_horizontal) {
		xScale = setTimeScale();
		yScale = setLocationScale();
	} else {
		xScale = setLocationScale();
		yScale = setTimeScale();
	}
	updateAxis();
}

function setTimeScale() {
	return d3.scaleTime()
		.domain([new Date(2008, 0, 1), new Date(2012, 0, 1)]);
}

function setLocationScale() {

	return d3.scalePoint()
		.domain(subset.map(function (d) {
			return d[chart.data.location];
		}));

}

function updateAxis() {
	xScale.range([chart.padding.left, chart.width - chart.padding.right]);
	yScale.range([chart.padding.top, chart.height - chart.padding.bottom]);

	xAxis = d3.axisBottom(xScale)
		.tickSize(-chart.height); //Draw Grids : Use negative width and height for the axis tick length And then use a CSS style to stroke the grid.

	yAxis = d3.axisLeft(yScale)
		.tickSize(-chart.width)
		.tickPadding(10);

	g.select('.x-axis').transition()
		.duration(200)
		.attr('transform', 'translate(0,' + chart.height + ')')
		.call(xAxis);

	g.select('.y-axis').transition()
		.duration(200)
		.call(yAxis);

}
