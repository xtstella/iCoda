let intervalBunshin = 10;

function addBunshinPoints(dataset) {

	dataset.forEach(function (dperson, iperson) {

		var previous = null;
		var yprevious = null;
		var ynext = null;
		var points = [];

		dperson.values.forEach(function (d, i) {

			if (timeAxis_horizontal) {
				var x = xScale(d[chart.data.time]);
				var y = yScale(d[chart.data.location]);
			} else {
				var x = xScale(d[chart.data.location]);
				var y = yScale(d[chart.data.time]);
			}
			var next = dperson.values[i + 1];
			if (next) {
				ynext = yScale(next[chart.data.location]);
			}

			if (!yprevious && ynext && y < ynext) {
				points = fromTopToBottom(x, y);
			} else if (!yprevious && ynext && y > ynext) {
				points = fromBottomToTop(x, y);
			} else if (!yprevious && ynext && y == ynext) {
				points = fromTopToBottom(x, y); // this can be changed
			} else if (yprevious && yprevious < y) {
				points = fromTopToBottom(x, y);
			} else if (yprevious && yprevious > y) {
				points = fromBottomToTop(x, y);
			} else if (yprevious && yprevious == y) {
				if (previous.Points[0].y > previous.Points[2].y) {
					points = fromTopToBottom(x, y);
				} else {
					points = fromBottomToTop(x, y);
				}
			} else {
				points = fromTopToBottom(x, y);
			}

			d.Points = points;
			yprevious = y;
			previous = d;
		});

	});

	dataset.forEach(function (dperson, iperson) {

		dperson.values.forEach(function (devent) {
			//console.log(dperson);		// key:"1", values: array(8)
			//console.log(devent);		// UID: .... city:... Points:(3) [{}{}{}]

			var rect = g.append("g").attr("class", "bunshin");

			var circles = rect.selectAll("circle")
				.data(devent.Points);

			circles.exit().remove();

			circles.enter()
				.append("circle")
				.merge(circles)
				.attr("class", function (d) {
					return "P" + devent.reviewerid;
				})
				.attr("cx", function (d, i) {
					return d.x;
				})
				.attr("cy", function (d, i) {
					return d.y;
				})
				.attr('r', function (d, i, e) {
					return 1;
				})
				.attr('stroke', function (d, i) {
					return colors(devent.reviewerid);
				})
				.attr("fill", function (d, i) {
					return colors(devent.reviewerid);
				})
				.attr("fill-opacity", "0.1")
				.style('opacity', 1)
				.on("mousemove", handleMousemove)
				.on("mouseout", handleMouseout);

		});
	});

}


function fromTopToBottom(x, y) {
	var points = [{
			x: x,
			y: y - intervalBunshin
					}, {
			x: x,
			y: y
					}, {
			x: x,
			y: y + intervalBunshin
					}
				];
	return points;
}

function fromBottomToTop(x, y) {
	var points = [{
			x: x,
			y: y + intervalBunshin
					}, {
			x: x,
			y: y
					}, {
			x: x,
			y: y - intervalBunshin
					}
				];
	return points;
}

/*
Object.keys(dataset).forEach(function (key) {

	var rect = g.append("g");

	var circles = rect.selectAll("circle")
		.data(dataset[key].Points)
		.enter()
		.append("circle")
		.attr("class", "P" + dataset[key].reviewerid);

	circles
		.attr("cx", function (d, i) {
			return d.x;
		})
		.attr("cy", function (d, i) {
			return d.y;
		})
		.attr('r', function (d, i, e) {
			return 2;
		})
		.attr('stroke', function (d, i) {
			return colors(dataset[key].reviewerid);
		})
		.attr("fill", function (d, i) {
			return colors(dataset[key].reviewerid);
		})
		.attr("fill-opacity", "0.1")
		.style('opacity', 1)
		.on("mousemove", handleMousemove)
		.on("mouseout", handleMouseout);
});
}

*/





/*

function addBumshin() {
	var c1 = g.append('g');
	var c2 = g.append('g');

	c1.selectAll('circle')
		.data(subset)
		.enter()
		.append('circle')
		.attr("class", "node1")
		.merge(c1)
		.attr('cx', function (d) {
			return getXPosition(d);
		})
		.attr('cy', function (d) {
			return (getYPosition(d) - 10);
		})
		.attr('r', radius)
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

	c2.selectAll('circle')
		.data(subset)
		.enter()
		.append('circle')
		.attr("class", "node2")
		.merge(c2)
		.attr('cx', function (d) {
			return getXPosition(d);
		})
		.attr('cy', function (d) {
			return (getYPosition(d) + 10);
		})
		.attr('r', radius)
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

	c1.exit().remove();
	c2.exit().remove();

}
*/
