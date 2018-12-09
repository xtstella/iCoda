function updateLinks() {

	g.selectAll('.path').remove();
	
	if (!bunshin.checked) {

		var person_EntityLine = d3.line()
			.x(function (d, i, e) {
				return getXPosition1(d, i, e);
			})
			.y(function (d, i, e) {
				return getYPosition1(d, i, e);
			})
			.curve(d3.curveCatmullRom.alpha(1));

		var u = g.selectAll('path')
			.data(peopleNest, function (d, i) {
				return d;
			});

		u.exit().remove();

		u.enter()
			.append('path')
			.merge(u)
			.attr("class", "path")
			.style("fill", "none")
			.style("stroke-width", '1.5px')
			.style("stroke", function (d) { // Add dynamically
				return d.color = colors(d.key);
			})
			.attr("d", function (d) {
				return person_EntityLine(d.values); //d.lineString;	
			});

		console.log(peopleNest);

	} else if (bunshin.checked) {

		console.log(peopleNest);
		addBunshinPoints(peopleNest);

		var lineData = [];

		for (var j = 1; j < peopleNest.length; j++) {

			var person = d3.selectAll("circle.P" + j)._groups[0];
			var lineData_eachPerson = [];
			for (var i = 0; i < person.length; i++) {
				if (person[i + 1]) {
					var point = {
						x: person[i].cx.animVal.value,
						y: person[i].cy.animVal.value,
						reviewerid: j
					}
					lineData_eachPerson.push(point);
				}
			}
			lineData.push(lineData_eachPerson);
		}

		var curve_gen = d3.line()
			.x(function (d) {
				return d.x;
			})
			.y(function (d) {
				return d.y;
			})
		//.curve(d3.curveMonotoneY);
			.curve(d3.curveCatmullRom.alpha(1));

		var rect = g.append("g").attr("class", "bunshinLines");

		var curve = rect.selectAll('.path')
			.data(lineData);

		curve.exit().remove();

		curve.enter()
			.append('path')
			.merge(curve)
			.attr("d", function (d) {
				return curve_gen(d);
			})
			.style("fill", "none")
			.style("stroke-width", '1.5px')
			.style("stroke", function (d) {
				return colors(d[0].reviewerid);
			});


	}


	function getXPosition1(d, i, e) {
		if (timeAxis_horizontal) {
			return xScale(d[chart.data.time]);
		} else {
			return xScale(d[chart.data.location]);
		}
	}

	function getYPosition1(d, i, e) {
		var position;

		if (timeAxis_horizontal) {
			position = yScale(d[chart.data.location]);
		} else {
			position = yScale(d[chart.data.time]);
		}

		if (jitter.checked) {
			return i % 2 === 0 ?
				position + Math.random() * chart.jitterVal :
				position - Math.random() * chart.jitterVal
		} else {
			return position;
		}
	}



}
