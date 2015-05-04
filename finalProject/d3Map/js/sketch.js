//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html

//start JS when the page is done loading
$(document).ready(function() {
	console.log("the document is ready");

/* VARIABLES */
	//svg canvas size
	var width = 960,
		height = 650;

	var projection = d3.geo.mercator()
		//center adjusts position by lat and long from center
		.center([0,30])
		//zoom
		.scale(140)
		//rotate adjust curvature
		.rotate([-11,0]);

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

/*SCATTER PLOTS */
		var plot1, plot2, plot3, plot4, plot5, plot6, remaining = 6;
		//afro-asiatic
		d3.csv("csv/afroAsiatic.csv", function(error, data) {
			plot1 = data;
			logData();
			if (!--remaining) {
				g.selectAll("circle")
				.data(plot1)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return projection([d.longitude, d.latitude])[0];
				})
				.attr("cy", function(d) {
					return projection([d.longitude, d.latitude])[1];
				})
				.attr("r",.5)
				.style("fill", "red");
			}
		});
		console.log("added afro-asiatic family scatter plot");
	/*	
		//australian
		d3.csv("csv/australian.csv", function(error, data) {
			plot2 = data;
			if (!--remaining) drawPlots();
				console.log("hey2");
				return data;
		})
		console.log("added australian family scatter plot");
		//austronesian 
		d3.csv("csv/austronesian.csv", function(error, data) {
			plot3 = data;
			if (!--remaining) drawPlots();
				console.log("hey3");
				return data;
		})
		console.log("added austronesian family scatter plot");
		//indo-european
		d3.csv("csv/indoEuropean.csv", function(error, data) {
			plot4 = data;
			if (!--remaining) drawPlots();
				console.log("hey4");
				return data;
		})
		console.log("added indo-european family scatter plot");
		//niger-congo
		d3.csv("csv/nigerCongo.csv", function(error, data) {
			plot5 = data;
			if (!--remaining) drawPlots();
				console.log("hey5");
				return data;
		})
		console.log("added niger-congo family scatter plot");	
		//sino-tibetan
		d3.csv("csv/sinoTibetan.csv", function(error, data) {
			plot6 = data;
			if (!--remaining) drawPlots();
				console.log("hey6");
				return data;
		})
		console.log("added sino-tibetan family scatter plot");	

*/

/* FUNCTIONS */
	function logData() {
		console.log(plot1);
	};
	function drawPlots() {
			g.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(plot1) {
					return projection([plot1.longitude, plot1.latitude])[0];
				})
				.attr("cy", function(plot1) {
					return projection([plot1.longitude, plot1.latitude])[1];
				})
				.attr("r",.5)
				.style("fill", "red");
	};


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

