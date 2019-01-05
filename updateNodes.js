function updateNodes() {

	g.selectAll("g.bunshin").remove();

	var u = g.selectAll('circle')
		.data(subset);

	u.enter()
		/*		.data(function(d){
			console.log(d);
				return d['location'].map(function(value){
					return {
						value: getLocation(d)
					}
				});
				
			})*/
		.append('circle')
		.attr("class", "node")
		.merge(u)
		.attr('cx', getXPosition)
		.attr('cy', getYPosition)
	/*
		.append('circle')
		.attr("class", "node")
		.merge(u)
		.attr('cx', getXPosition)
		.attr('cy', getYPosition2)*/
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
