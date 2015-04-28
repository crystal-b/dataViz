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

	//csv files
	var csv1 = null;
	var csv2 = null;
	var csv3 = null;
	var csv4 = null;
	var csv5 = null;
	var csv6 = null;
	var color = null;


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
/*SCATTER PLOTS */
	//all
	/*
			d3.csv("csv/language.csv", function(error, data) {
			g.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return projection([d.longitude, d.latitude])[0];
				})
				.attr("cy", function(d) {
					return projection([d.longitude, d.latitude])[1];
				})
				.attr("r",.5)
				.style("fill", "#32CD32");
		})
		console.log("added scatter plot for all languages");
	});
	*/

	//afro-asiatic
		d3.csv("csv/afroAsiatic.csv", function(error, data) {
			console.log("loading csv 1");
			csv1 = data;
			color = "red";
			finishLoading(csv1, color);
			var selA = g.selectAll("circle.csv1").data(csv1);
				selA.exit().remove();
				console.log("removing selection A");
				selA.enter().append("circle").classed("csv1", true);
				console.log("adding a class to selection A");
		});
	//australian
		d3.csv("csv/australian.csv", function(error, data) {
			console.log("loading csv 2");
			csv2 = data;
			color = "blue";
			finishLoading(csv2, color);
		});
	//austronesian 
		d3.csv("csv/austronesian.csv", function(error, data) {
			console.log("loading csv 3");
			csv3 = data;
			color = "orange";
			finishLoading(csv3, color);
		});
/* I'm only going to plot 3 families for now and move on

	//indo-european
		d3.csv("csv/indoEuropean.csv", function(error, data) {
			console.log("loading csv 4");
			csv4 = data;
			color = "#FF69B4";
			finishLoading(csv4, color);
		});
	//niger-congo
		d3.csv("csv/nigerCongo.csv", function(error, data) {
			console.log("loading csv 5");
			csv5 = data;
			color = "purple";
			finishLoading(csv5, color);
		});
	//sino-tibetan
		d3.csv("csv/sinoTibetan.csv", function(error, data) {
			console.log("loading csv 6");
			csv6 = data;
			color = "green";
			finishLoading(csv6, color);
		});
*/

	//create circle classes for CSS
		var selA = g.selectAll("circle.csv1").data(csv1);
			selA.exit().remove();
			console.log("removing selection A");
			selA.enter().append("circle").classed("csv1", true);
			console.log("adding a class to selection A");
		var selB = g.selectAll("circle.csv2").data(csv2);
			selB.exit().remove();
			selB.enter().append("circle").classed("csv2", true);
		var selC = g.selectAll("circle.csv3").data(csv3);
			selC.exit().remove();
			selC.enter().append("circle").classed("csv3", true);
		var selD = g.selectAll("circle.csv4").data(csv4);
			selD.exit().remove();
			selD.enter().append("circle").classed("csv4", true);
		var selE = g.selectAll("circle.csv5").data(csv5);
			selE.exit().remove();
			selE.enter().append("circle").classed("csv5", true);
		var selF = g.selectAll("circle.csv6").data(csv6);
			selF.exit().remove();
			selF.enter().append("circle").classed("csv6", true);

	//draw map
		function finishLoading(data, color) {
			setTimeout(function() {
				if(!csv1 || !csv2 || !csv3/* || !csv4 || !csv5 || !csv6 */) return;
				g.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return projection([d.longitude, d.latitude])[0];
				})
				.attr("cy", function(d) {
					return projection([d.longitude, d.latitude])[1];
				})
				.attr("r",.5)
				.style("fill", color);
				console.log("drawing csv");
			}, 0);
		}

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




















