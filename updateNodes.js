function updateNodes() {
	
	g.selectAll("g.bunshin").remove();
	
	var u = g.selectAll('circle')
		.data(subset);

	u.enter()
		.append('circle')
		.attr("class", "node")
		.merge(u)
		.attr('cx', getXPosition)
		.attr('cy', getYPosition)
		.attr('r', getRadius)
		.attr('stroke', function (d, i) {
			return colors(d.reviewerid);
		})
		.attr("fill", function (d, i) {
			return colors(d.reviewerid);
		})
		.attr("fill-opacity", "0.1")
		.style('opacity', 1)
		.on("mousemove", handleMousemove)
		.on("mouseout", handleMouseout);

}


function getXPosition(d, i, e) {
	var position;

	if (timeAxis_horizontal) {
		position = xScale(d[chart.data.time]);
	} else {
		position = xScale(d[chart.data.location]);
	}

	var collidedPoints = collisionDetection(d, e);

	if (jitter.checked && collidedPoints.length > 1 && !timeAxis_horizontal) {
		return i % 2 === 0 ?
			position + Math.random() * chart.jitterVal :
			position - Math.random() * chart.jitterVal
	} else {
		return position;
	}
}

function getYPosition(d, i, e) {
	var position;

	if (timeAxis_horizontal) {
		position = yScale(d[chart.data.location]);
	} else {
		position = yScale(d[chart.data.time]);
	}
	
	var collidedPoints = collisionDetection(d, e);


	if (jitter.checked && collidedPoints.length > 1 && timeAxis_horizontal) {
		return i % 2 === 0 ?
			position + Math.random() * chart.jitterVal :
			position - Math.random() * chart.jitterVal
	} else {
		return position;
	}
}