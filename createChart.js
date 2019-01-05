function createChart() {

	tooltip = d3.select('#chart-tooltip');
	tooltip2 = d3.select('#chart-tooltip2');
	tooltip3 = d3.select('#chart-tooltip3');
	tooltip4 = d3.select('#chart-tooltip4');
	
	svg = d3.select(chart.container)
		.append('svg')
		.attr("width", chart.width + 200)
		.attr("height", chart.height + 200);

	g = svg.append('g')
		.attr("transform", "translate(" + chart.margin.left + "," + chart.margin.top + ")");

	grid = g.append('rect')
		.attr('class', 'grid')
		.attr('fill', '#e7e7e7')
		.style("stroke", "#222")
		.attr('width', chart.width)
		.attr('height', chart.height);

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + chart.height + ')');

	g.append('g')
		.attr('class', 'y-axis')
		.attr('transform', 'translate(0,0)');

	neutral = g.append('line')
		.attr('class', 'neutral-line');

}


function updateChart() {

	xScale = d3.scaleTime()
		.domain(getTimeDomain())
		.range([chart.padding.left, chart.width - chart.padding.right]);

	yScale = d3.scalePoint()
		.domain(getLocationDomain())
		.range([chart.padding.top, chart.height - chart.padding.bottom]);


	xAxis = d3.axisBottom(xScale)
		.tickFormat(DateAxis)
		/*.tickFormat(d3.time.format("%Y-%m-%d"))*/
		.tickSize(-chart.height); //Draw Grids : Use negative width and height for the axis tick length And then use a CSS style to stroke the grid.

	yAxis = d3.axisLeft(yScale)
		.tickSize(-chart.width)
		.tickPadding(10);

	g.select('.x-axis').transition()
		.attr('transform', 'translate(0,' + chart.height + ')')
		.call(xAxis);

	g.select('.y-axis').transition()
		.call(yAxis);

	neutral.transition()
		.attr('x1', xScale(0))
		.attr('x2', xScale(0))
		.attr('y1', 0)
		.attr('y2', chart.height);

}

function getLocationDomain() {
	var LocationArray =
		nodes.map(function (d) {
			return d['location_name'];
		})
	return LocationArray;
}


function getTimeDomain() {
	var mergeTimeArray = d3.extent(
		nodes.map(function (d) {
			return d[chart.data.time];
		})
	);
	return mergeTimeArray;

}
