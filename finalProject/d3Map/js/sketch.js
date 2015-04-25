//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html

//start JS when the page is done loading
$(document).ready(function() {
	console.log("the document is ready");

/* VARIABLES */
	var width = 960,
		height = 500;

	var projection = d3.geo.mercator()
		//I don't understand the diference between rotate and center
		.center([0,5])
		//zoom
		.scale(140)
		.rotate([0,0]);

	//svg window settings
	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	//geographic path generator for the Mercator projection
	//I don't understand how this works
	var path = d3.geo.path()
		.projection(projection);

	//the svg
	var g = svg.append("g");


/* FUNCTIONS */
	//draw the map
	//load the json world map coordinates file
	d3.json("world-110m2.json", function(error, topology) {
		//declare that the json data will be used by all of the path element of the svg
		g.selectAll("path")
			//pull out the data that defines the countries in the topoJson file
			//(file>object(object type, object type > object type object > object type object element: countries))
			//right, so I don't understand the above at all
			.data(topojson.object(topology, topology.objects.countries)
				.geometries)
			//add data
			.enter()
				//turn data into path elements
				.append("path")
				//make the elements dynamic to loop through the data
				.attr("d", path)

	});
	console.log("the map is done");

	//zooming feature
	//declare zoom as a d3 function
	var zoom = d3.behavior.zoom()
		//create event listeners for zooming/panning mouse actions
		.on("zoom", function() {
			//when zooming, perform this function on the "g" svg container
			//first gather the correct formats for translate and scale
			g.attr("transform","translate("+
				d3.event.translate.join(",")+")scale("+d3.event.scale+")");
			//and then apply those to the path elements that draw the country shapes
			g.selectAll("path")
				.attr("d", path.projection(projection));
		});
/* FUNCTION CALLS */
	//call the zoom function
	svg.call(zoom)
	console.log("now you can also pan + zoom");
});




















