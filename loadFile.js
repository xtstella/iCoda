function handleFileSelect() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}

	var f = event.target.files[0]; // FileList object
	var reader = new FileReader();

	reader.onload = function (event) {
		load_d3(event.target.result)
	};
	// Read in the file as a data URL.
	reader.readAsDataURL(f);
}


function load_d3(fileHandler) {

	d3.json(fileHandler, function (error, data) {
		ProcessingData(data);
/*
		if (chart.data.numberToShow > 300) {
			colors = d3.scaleOrdinal(d3.schemeCategory30);
		} else {
			colors = d3.scaleOrdinal(d3.schemeCategory10);
		}*/
		process_nodes_links();
		updateChart();
		create_force();
		//updateNodes();
		//updateLinks();
	});

}
