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




//.......................     Interface     .........................


//................     CAT1 - Consonant Inventories     ...................
var cat1Data1 = null;
var cat1Data2 = null;
var cat1Data3 = null;
var cat1Data4 = null;
var cat1Data5 = null;


//var langAreaTarget = $("#menu");
//on clicking category 1
//$("#cat1").click(function() {
//load the csv file for all language families
	d3.csv("csv/cat1value1.csv", function(err, data) {
		if(err) return console.warn(err);
		cat1Data1 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat1value2.csv", function(err, data) {
		if(err) return console.warn(err);
		cat1Data2 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat1value3.csv", function(err, data) {
		if(err) return console.warn(err);
		cat1Data3 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat1value4.csv", function(err, data) {
		if(err) return console.warn(err);
		cat1Data4 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat1value5.csv", function(err, data) {
		if(err) return console.warn(err);
		cat1Data5 = data;
		finishLoadCat1();
	});
//})

//check to see that all cat1 CSV files are loaded
function finishLoadCat1() {
  setTimeout(function() {
    if(!cat1Data1 || !cat1Data2 || !cat1Data3 || !cat1Data4 || !cat1Data5) return;
   // if(!cat1Data1) return;
    	renderCat1();
    	console.log("cat1 is loaded");
  }, 0);
}

//draw all cat1 scatter plots with toggle option to turn display on and off for individual values
function renderCat1(){  
	var selCat1Value1 = g.selectAll("circle.cat1Data1").data(cat1Data1);
	selCat1Value1.exit().remove();
	selCat1Value1
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "red")
	.classed("cat1Data1", true);
	d3.select("#btn1")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat1Value1.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat1Value1.style("opacity", newOpacity);
			selCat1Value1.active = active;
			console.log("button c1v1 clicked");
			console.log(active);
		});

	var selCat1Value2 = g.selectAll("circle.cat1Data2").data(cat1Data2);
	selCat1Value2.exit().remove();
	selCat1Value2
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "orange")
	.classed("cat1Data2", true);
	d3.select("#btn2")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat1Value2.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat1Value2.style("opacity", newOpacity);
			selCat1Value2.active = active;
			console.log("button c1v2 clicked");
			console.log(active);
		});

	var selCat1Value3 = g.selectAll("circle.cat1Data3").data(cat1Data3);
	selCat1Value3.exit().remove();
	selCat1Value3
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "green")
	.classed("cat1Data3", true);
	d3.select("#btn3")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat1Value3.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat1Value3.style("opacity", newOpacity);
			selCat1Value3.active = active;
			console.log("button c1v3 clicked");
			console.log(active);
		});

	var selCat1Value4 = g.selectAll("circle.cat1Data4").data(cat1Data4);
	selCat1Value4.exit().remove();
	selCat1Value4
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "blue")
	.classed("cat1Data4", true);
	d3.select("#btn4")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat1Value4.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat1Value4.style("opacity", newOpacity);
			selCat1Value4.active = active;
			console.log("button c1v4 clicked");
			console.log(active);
		});

	var selCat1Value5 = g.selectAll("circle.cat1Data5").data(cat1Data5);
	selCat1Value5.exit().remove();
	selCat1Value5
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "purple")
	.classed("cat1Data5", true);
	d3.select("#btn5")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat1Value5.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat1Value5.style("opacity", newOpacity);
			selCat1Value5.active = active;
			console.log("button c1v5 clicked");
			console.log(active);
		});
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