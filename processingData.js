function ProcessingData(inputdata) {

	hoverDate = d3.timeFormat("%d/%m/%Y");
	parseDate = d3.timeParse("%Y-%m-%d");
	var yearmonth = d3.timeFormat("%Y-%m");

	subset = inputdata.slice(0, chart.data.numberToShow);
	console.log(subset);

	var user_array = [],
		user_uid = 0,
		user_array_uid = [];

	var t = [];

	subset.forEach(function (d) {

		/*d.year = d3.timeParse("%Y-%m-%d")(d.date).getFullYear();
		d.month = d3.timeParse("%Y-%m-%d")(d.date).getMonth() + 1;
		d.day = d3.timeParse("%Y-%m-%d")(d.date).getDay();*/

		d.date = parseDate(d.date);
		d.showdate = hoverDate(d.date);
		d.yearmonth = yearmonth(d.date);

		if (!user_array_uid.includes(d.user_id)) {
			user_array_uid.push(d.user_id);
			user_uid++;
			d.reviewerid = user_uid;

		} else {
			var userid = user_array_uid.indexOf(d.user_id) + 1;
			d.reviewerid = userid;

		}


	});

	subset = subset.sort(sortByDateAscending);
	subset = subset.sort(sortByCityAscending);

	// Nest the entries by user_id
	dataNest = d3.nest()
		.key(function (d) {
			return d.reviewerid;
		})
		.entries(subset);


}


function sortByDateAscending(a, b) {
	// Dates will be cast to numbers automagically:
	return a[chart.data.time] - b[chart.data.time];
}

function sortByCityAscending(a, b) {
	// Dates will be cast to numbers automagically:
	return a[chart.data.locatoin] - b[chart.data.location];
}
