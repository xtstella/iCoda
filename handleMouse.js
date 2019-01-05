function handleMousemove(d, i) {
	var mousePosition = d3.mouse(this);

	tooltip
		.style('left', mousePosition[0] - 60 + 'px')
		.style('top', mousePosition[1] - 50 + 'px')
		.style('opacity', 1)
		.style('z-index', 10);

	tooltip.select('.publication').html("<strong>" + "pub" + d.id + "</strong>" + ",");
	tooltip.select('.person').html(d['person_name'] + ",");
	tooltip.select('.date').html(DateTime(d[chart.data.time]) + ",");
	tooltip.select('.location').html(d['location_name']);

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


