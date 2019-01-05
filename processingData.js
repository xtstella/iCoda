function ProcessingData(inputdata) {

	console.log(inputdata);
	subset = inputdata.slice(0, 800);

	var date_array = [],
		date_id = 0;

	var id_array = [],
		UID = 0;

	var person_names = [],
		person_id = 0;

	subset.forEach(function (d) {

		d.dateObject = new Date(d['fulltime']);
		/*d.datehover = Datehover(d.date);*/
		d.dateYM = DateYM(d.dateObject);

		if (!date_array.includes(d.date)) {
			date_array.push(d.date);
			d.date_id = date_id;
			date_id++;
		} else {
			d.date_id = date_array.indexOf(d.date);
		}

		/*if (!id_array.includes(d.id)) {
					id_array.push(d.id);
					d.UID = UID;
					UID++;
				} else {
					d.UID = id_array.indexOf(d.id);
				}*/

		/*for (var p in d.person_names) {
					if (!person_names.includes(p)) {
						person_names.push(p);
						d.person_names = person_names;
						person_id++;
					} else {
						d.person_id = person_id_array.indexOf(d.person_id);
					}
				}*/
	});

	console.log("subset:");
	console.log(subset);
	//subset = subset.sort(sortByDateAscending);
	//subset = subset.sort(sortByCityAscending);

	dateNest = d3.nest()
		.key(function (d) {
			return d.date_id;
		})
		.entries(subset);

	console.log("dateNest:");
	console.log(dateNest);

	var person_pub = extractPerson(subset);

	peopleNest = d3.nest()
		.key(function (d) {
			return d.person_name;
		})
		.entries(person_pub);

	console.log("peopleNest:");
	console.log(peopleNest);

}


function sortByDateAscending(a, b) {
	// Dates will be cast to numbers automagically:
	return a[chart.data.time] - b[chart.data.time];
}

function sortByCityAscending(a, b) {
	// Dates will be cast to numbers automagically:
	return a[chart.data.locatoin] - b[chart.data.location];
}

//https://stackoverflow.com/questions/39592554/nest-data-containing-arrays-with-d3-nest
function extractPerson(data) {
	var res = [];
	data.forEach(function (publication) {
		publication.person_names.forEach(function (person_name) {
			res.push({
				person_name: person_name,
				publication: publication
			});
		})
	})
	return res;
}
