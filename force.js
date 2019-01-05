var node_id = 0;
var person_uid = 0
var person_names_array = [];

function process_nodes_links() {

	peopleNest.forEach(function (person, i) {
		var person_name = person.key;
		var values = person.values;

		values.forEach(function (d) {
			// each d is a publiction, with a single person_name
			var pub = d.publication;
			var pub_id = pub.id;
			var date_id = pub.date_id;
			var dateObject = pub.dateObject;
			var location_names = pub.location_names;
			var related_person_names = pub.person_names;
			var person_id;

			if (!person_names_array.includes(person_name)) {
				person_names_array.push(person_name);
				person_id = person_uid;
				person_uid++;
			} else {
				person_id = person_names_array.indexOf(person_name);
			}

			for (var i = 0; i < location_names.length; i++) {
				nodes.push({

					id: node_id,
					pub_id: pub_id,
					person_id: person_id,
					person_name: person_name,
					date_id: date_id,
					dateObject: dateObject,
					location_name: location_names[i],
					selected: false
				})

				/*			console.log(id + " - " + (id + 1));
					if ()
						links.push({
							source: id,
							target: id + 1
						});
						*/
				node_id++;
			}



		});

	});

	for (var i = 0; i < nodes.length; i++) {
		for (var j = i + 1; j < nodes.length; j++) {
			if (nodes[i].person_name === nodes[j].person_name) {
				links.push({
					source: nodes[i].id,
					target: nodes[j].id
				});
			}
		}
	}


	var peopleforceNest = d3.nest()
		.key(function (d) {
			return d.person_name;
		})
		.entries(nodes);

	console.log("nodes:");
	console.log(nodes);
	console.log("peopleforceNest:");
	console.log(peopleforceNest);
	console.log("links:");
	console.log(links);
}


function create_force() {

	const simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function (d) {
			return d.id
		}));

	//.force("collide", d3.forceCollide(1))
	simulation
		.nodes(nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(links);
	/*
		var force = d3.layout.force()
			.nodes(d3.values(nodes))
			.links(links)
			.size([width, height])
					.linkDistance(60)
					.charge(-300)
			.on("tick", tick)
			.start();
	*/

	var node = g.append("g").selectAll(".node")
		.data(nodes)
		.enter()
		.append('circle')
		.attr("class", function (d) {
			return "node." + d.person_id;
		})
		.attr("id", function (d) {
			return ("node_" + d.person_id);
		})
		.attr('cx', getXPosition)
		.attr('cy', getYPosition)
		.attr('r', getRadius)
		.attr('stroke', function (d, i) {
			return colors(d.person_id);
		})
		.attr("fill", function (d, i) {
			return colors(d.person_id);
		})
		.style("fill-opacity", "0.2")
		.style('opacity', 1)
		.on("mousemove", handleMousemove)
		.on("mouseout", handleMouseout)
		.on('click', handleMouseclicked);

	/*			var tip = d3.tip()
					.attr('class', 'd3-tip')
					.offset([-10, 0])
					.style('opacity', 1)
					.style('z-index', '99999999999')
					.html(function (d) {
						console.log(d.index);
						return "index: " + d.index + "<br>other information...";
					});

				if (d.selected) {
					console.log(tip);
					console.log(d);
					tip.show(d);
				} else {
					tip.hide(d);
				}
				svg.call(tip);*/




	var link = g.append("g")
		.selectAll("line")
		.data(links)
		.enter()
		.append("line")
		.attr("class", "link")
		.attr("id", function (d) {
			return ("link_" + d.source.person_id);
		})
		.style("stroke-width", '1.5px')
		.style("stroke-opacity", "0.1")
		.style("stroke", function (d) {
			return colors(d.source.person_id);
		})
		.attr("fill", function (d, i) {
			return colors(d.source.person_id);
		});

	var labels = g.selectAll(".label").data(nodes)
		.enter().append("text")
		.attr("class", "label")
		.style("font-size", "14px")
		.style("font-weight", "bold")
		.style("text-anchor", "middle");


	/*
	var node2neighbors = {};
	for (var i = 0; i < nodes.length; i++) {
		var index = nodes[i].index;
		node2neighbors[index] = links.filter(function (d) {
			return d.source.index == index || d.target.index == index;
		}).map(function (d) {
			return d.source.index == index ? d.target.index : d.source.index;
		});
	}
	console.log(node2neighbors);

	node
		.on("click", function (n) {
			console.log(this);
			// Determine if current node's neighbors and their links are visible
			var active = n.active ? false : true // toggle whether node is active
				,
				newOpacity = active ? 0 : 1;

			// Extract node's name and the names of its neighbors
			var index = n.index,
				neighbors = node2neighbors[index];

			console.log(neighbors);
			// Hide the neighbors and their links
			for (var i = 0; i < neighbors.length; i++) {
				d3.select("#node_" + neighbors[i]).style("opacity", newOpacity);
				console.log(d3.select("#link_" + index + "_" + neighbors[i]));
				d3.select("#link_" + index + "_" + neighbors[i]).style("opacity", newOpacity);
			}
			// Update whether or not the node is active
			n.active = active;
		});*/


	function ticked() {

		link
			.attr("x1", function (d) {
				return xScale(d.source.dateObject);
			})
			.attr("y1", function (d) {
				return yScale(d.source.location_name);
			})
			.attr("x2", function (d) {
				return xScale(d.target.dateObject);
			})
			.attr("y2", function (d) {
				return yScale(d.target.location_name);
			});

		labels.attr("x", function (d) {
				return xScale(d.dateObject);
			})
			.attr("y", function (d) {
				return yScale(d.location_name);
			});

		//path.attr("d", linkArc);
		//circle.attr("transform", transform);
		//text.attr("transform", transform);
	}

	function linkArc(d) {

		var dx = d.target.x - d.source.x,
			dy = d.target.y - d.source.y,
			dr = Math.sqrt(dx * dx + dy * dy);

		console.log(
			"M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y);

		return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	}


	function handleMouseclicked(d) {

		d.selected = !d.selected;
		var newOpacity = d.selected ? 1 : 0.2;

		var index = d.index;
		var person_id = d.person_id;

		d3.selectAll("#node_" + person_id).style("fill-opacity", newOpacity);
		d3.selectAll("#link_" + person_id).style("stroke-opacity", newOpacity);

		var mousePosition = d3.mouse(this);

		//addTooltip(tooltip2, d, mousePosition);

		var selectedArray = node
			.filter(function (d) {
				return d.selected;
			});

		labels.filter(function (d) {
				return d.selected;
			})
			.attr("dx", 120)
			.attr("dy", 0)
			.text(function (d) {
				console.log("selected node:");
				console.log(d);
				return d.person_name + " (" + d.location_name /*DateDM(d.dateObject)*/ + ")";
			});

	}
}



function getXPosition(d, i, e) {

	var position;

	if (timeAxis_horizontal) {
		position = xScale(d[chart.data.time]);
	} else {
		position = xScale(d['location_name']);
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
		position = yScale(d['location_name']);
		//position = yScale(getLocation(d)[0]);
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


function addTooltip(t, d, mousePosition) {

	t
		.style('left', mousePosition[0] - 60 + 'px')
		.style('top', mousePosition[1] - 50 + 'px');

	t.select('.publication').html("<strong>" + "pub" + d.id + "</strong>" + ",");
	t.select('.person').html(d['person_name'] + ",");
	t.select('.date').html(DateTime(d[chart.data.time]) + ",");
	t.select('.location').html(d['location_name']);

	if (d.selected) {
		t
			.style('opacity', 1)
			.style('z-index', 10);

	} else {
		t
			.style('opacity', 0)
			.style('z-index', -10);
	}
}

function mouseclick(d) {

	d.selected = !d.selected;

	if (d.selected) {
		var div = d3.select(chart.container).append("div")
			.attr("class", "tooltip")
			.style('opacity', 1)
			.style("left", (d.y) + "px")
			.style("top", (d.x) + "px")
			.style('z-index', '99999999999')
			.html(
				"<table style='font-size: 10px; font-family: sans-serif;' >" +
				"<tr><td>Name: </td><td>" + d.index + "</td></tr>" +
				"</table>"
			);
		console.log(div);
	} else {
		d3.select(this).selectAll('div.tooltip').remove();
	}

}
