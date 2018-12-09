var topLabels = [
	{
		text: 'Start',
		position: 0,
		anchor: 'start'
    	},
	{
		text: 'Time1',
		position: 0.5,
		anchor: 'middle'
    	},
	{
		text: 'End',
		position: 1,
		anchor: 'end'
    	}
    ];

var sankey = d3.sankey()
	.nodeWidth(25) // was 15
	.nodePadding(20) // was 10
	.size([chart.width, chart.height]);


var path = sankey.link();


sankey
	.nodes(graph.nodes)
	.links(graph.links)
	.layout(32);

// add in the links
var link = svg.append("g").selectAll(".link")
	.data(graph.links)
	.enter().append("path")
	.attr("class", "link")
	.attr("d", path)
	.style("stroke-width", function (d) {
		return Math.max(1, d.dy);
	})
	.sort(function (a, b) {
		return b.dy - a.dy;
	});

// add the link titles
link.append("title")
	.text(function (d) {
		return d.source.name + " → " +
			d.target.name + "\n" + format(d.value);
	});

// add in the nodes
var node = svg.append("g").selectAll(".node")
	.data(graph.nodes)
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function (d) {
		return "translate(" + d.x + "," + d.y + ")";
	})
	.call(d3.drag()
		.subject(function (d) {
			return d;
		})
		.on("start", function () {
			this.parentNode.appendChild(this);
		})
		.on("drag", dragmove));

// add the rectangles for the nodes
node.append("rect")
	.attr("height", function (d) {
		return d.dy;
	})
	.attr("width", sankey.nodeWidth())
	.style("fill", function (d) {
		return d.color = color(d.name.replace(/ .*/, ""));
	})
	.style("stroke", function (d) {
		return d3.rgb(d.color).darker(2);
	})
	.append("title")
	.text(function (d) {
		return d.name + "\n" + format(d.value);
	});

// add in the title for the nodes
node.append("text")
	.attr("x", -6)
	.attr("y", function (d) {
		return d.dy / 2;
	})
	.attr("dy", ".35em")
	.attr("text-anchor", "end")
	.attr("transform", null)
	.text(function (d) {
		return d.name;
	})
	.filter(function (d) {
		return d.x < width / 2;
	})
	.attr("x", 6 + sankey.nodeWidth())
	.attr("text-anchor", "start");

// the function for moving the nodes
function dragmove(d) {
	d3.select(this)
		.attr("transform",
			"translate(" +
			d.x + "," +
			(d.y = Math.max(
				0, Math.min(height - d.dy, d3.event.y))) + ")");
	sankey.relayout();
	link.attr("d", path);
}