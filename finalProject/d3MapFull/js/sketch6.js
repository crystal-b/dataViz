//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html
//http://www.d3noob.org/2014/05/show-hide-d3js-element-by-clicking-on.html

//start JS when the page is done loading
$(document).ready(function() {
	console.log("the document is ready");

//...................     Map      ...................
/* VARIABLES */
	//svg canvas size
	var width = 960,
		height = 650;
	var projection = d3.geo.mercator()
		.center([0,30])		//center adjusts position by lat and long from center
		.scale(140)		//zoom
		.rotate([-11,0]);		//rotate adjust curvature
	var svg = d3.select("body").append("svg")	//svg window settings
		.attr("width", width)
		.attr("height", height);
	var path = d3.geo.path() 	//geographic path generator for the Mercator projection
		.projection(projection);
	//the SVG
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

	//Value Buttons Colors
	
	$(".btn").click(function() {
		console.log("click");
		$(this).toggleClass("active")
	});
	




//.......................     Interface     .........................


//................     Cat4 - Consonant Inventories     ...................
var cat6Data1 = null;
var cat6Data2 = null;
var cat6Data3 = null;
var cat6Data4 = null;
// var cat6Data5 = null;

//load the csv file for all language families
	d3.csv("csv/cat6val1.csv", function(err, data) {
		if(err) return console.warn(err);
		cat6Data1 = data;
		finishLoadCat6();
	});
	d3.csv("csv/cat6val2.csv", function(err, data) {
		if(err) return console.warn(err);
		cat6Data2 = data;
		finishLoadCat6();
	});
	d3.csv("csv/cat6val3.csv", function(err, data) {
		if(err) return console.warn(err);
		cat6Data3 = data;
		finishLoadCat6();
	});
	d3.csv("csv/cat6val4.csv", function(err, data) {
		if(err) return console.warn(err);
		cat6Data4 = data;
		finishLoadCat6();
	});
	// d3.csv("csv/cat6val5.csv", function(err, data) {
	// 	if(err) return console.warn(err);
	// 	cat6Data5 = data;
	// 	finishLoadCat6();
	// });

//check to see that all Cat4 CSV files are loaded
function finishLoadCat6() {
  setTimeout(function() {
    if(!cat6Data1 || !cat6Data2 || !cat6Data3  || !cat6Data4) return;
   // if(!cat6Data1) return;
    	renderCat6();
    	console.log("cat6 is loaded");
  }, 0);
}

//draw all Cat4 scatter plots with toggle option to turn display on and off for individual values
function renderCat6(){  
	var selCat6val1 = g.selectAll("circle.cat6Data1").data(cat6Data1);
	selCat6val1.exit().remove();
	selCat6val1
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#003300")
	.classed("cat6Data1", true);
	d3.select("#btn1")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat6val1.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat6val1.style("opacity", newOpacity);
			selCat6val1.active = active;
			console.log("button c6v1 clicked");
			console.log(active);
		});

	var selCat6val2 = g.selectAll("circle.cat6Data2").data(cat6Data2);
	selCat6val2.exit().remove();
	selCat6val2
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#4BB74C")
	.classed("cat6Data2", true);
	d3.select("#btn2")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat6val2.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat6val2.style("opacity", newOpacity);
			selCat6val2.active = active;
			console.log("button c6v2 clicked");
			console.log(active);
		});

	var selCat6val3 = g.selectAll("circle.cat6Data3").data(cat6Data3);
	selCat6val3.exit().remove();
	selCat6val3
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#76EEC6")
	.classed("cat6Data3", true);
	d3.select("#btn3")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat6val3.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat6val3.style("opacity", newOpacity);
			selCat6val3.active = active;
			console.log("button c6v3 clicked");
			console.log(active);
		});

	var selCat6val4 = g.selectAll("circle.cat6Data4").data(cat6Data4);
	selCat6val4.exit().remove();
	selCat6val4
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#BCED91")
	.classed("cat6Data4", true);
	d3.select("#btn4")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat6val4.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat6val4.style("opacity", newOpacity);
			selCat6val4.active = active;
			console.log("button c6v4 clicked");
			console.log(active);
		});

	// var selCat6val5 = g.selectAll("circle.cat6Data5").data(cat6Data5);
	// selCat6val5.exit().remove();
	// selCat6val5
	// .enter()
	// .append("circle")	
	// .attr("cx", function(d) {
	// 	return projection([d.longitude, d.latitude])[0];
	// })
	// .attr("cy", function(d) {
	// 	return projection([d.longitude, d.latitude])[1];
	// })
	// .attr("r",2)
	// .style("fill", "#068481")
	// .classed("cat6Data5", true);
	// d3.select("#btn5")
	// 	.on("click", function() {
	// 		//determine if current svg is visible
	// 		var active = selCat6val5.active ? false: true,
	// 			newOpacity = active? 0 : 1;
	// 		//hide or show elements
	// 		selCat6val5.style("opacity", newOpacity);
	// 		selCat6val5.active = active;
	// 		console.log("button c6v5 clicked");
	// 		console.log(active);
	// 	});
}





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