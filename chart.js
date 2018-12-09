function createChart() {

	tooltip = d3.select(chart.tooltip);

	svg = d3.select(chart.container)
		.append('svg')
		.attr("width", chart.width+200)
		.attr("height", chart.height+200);

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
		.attr('transform', 'translate(0,' + chart.height  + ')');

	g.append('g')
		.attr('class', 'y-axis')
		.attr('transform', 'translate(0,0)');

	neutral = g.append('line')
		.attr('class', 'neutral-line');

}


function updateChart() {

	xScale = d3.scaleTime()
		.domain([new Date(2008, 0, 1), new Date(2012, 0, 1)])
		.range([chart.padding.left, chart.width-chart.padding.right]);

	yScale = d3.scalePoint()
		.domain(subset.map(function (d) {
			return d[chart.data.location];
		}))
		.range([chart.padding.top, chart.height-chart.padding.bottom]);


	xAxis = d3.axisBottom(xScale)
		.tickSize(-chart.height); //Draw Grids : Use negative width and height for the axis tick length And then use a CSS style to stroke the grid.

	yAxis = d3.axisLeft(yScale)
		.tickSize(-chart.width)
		.tickPadding(10);

	/**
	 * Transition elems
	 **/

/*	grid.transition()
		.attr('width', chart.width)
		.attr('height', chart.height);*/

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



function handleMousemove(d, i) {
	var mousePosition = d3.mouse(this);

	tooltip
		.style('left', mousePosition[0] - 60 + 'px')
		.style('top', mousePosition[1] - 50 + 'px')
		.style('opacity', 1)
		.style('z-index', 10);

	tooltip.select('.user').html("<strong>" + "user" + d.reviewerid + "</strong>" + ",");
	tooltip.select('.name').html(d.reviewer_name + ",");
	tooltip.select('.date').html(hoverDate(d[chart.data.time]) + ",");
	tooltip.select('.city').html(d[chart.data.location]);

	/*    tooltip.select('.value').html(parseInt(d.value*100) + '%')
	    tooltip.select('.value').style('color', function() {
	      return d.value >= 0 ?
	          state.scales.color.positive(d.value)
	        : state.scales.color.negative(d.value)
	    })*/
}


function handleMouseout(d, i) {
	tooltip
		.style('opacity', 0)
		.style('z-index', -1)

	d3.select(chart.container).selectAll('.node')
		.style('opacity', 1)
}
