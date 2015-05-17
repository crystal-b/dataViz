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


//................     CAT1 - Consonant Inventories     ...................
var cat3Data1 = null;
var cat3Data2 = null;
var cat3Data3 = null;
var cat3Data4 = null;
var cat3Data5 = null;

//load the csv file for all language families
	d3.csv("csv/cat3val1.csv", function(err, data) {
		if(err) return console.warn(err);
		cat3Data1 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat3val2.csv", function(err, data) {
		if(err) return console.warn(err);
		cat3Data2 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat3val3.csv", function(err, data) {
		if(err) return console.warn(err);
		cat3Data3 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat3val4.csv", function(err, data) {
		if(err) return console.warn(err);
		cat3Data4 = data;
		finishLoadCat1();
	});
	d3.csv("csv/cat3val5.csv", function(err, data) {
		if(err) return console.warn(err);
		cat3Data5 = data;
		finishLoadCat1();
	});

//check to see that all cat1 CSV files are loaded
function finishLoadCat1() {
  setTimeout(function() {
    if(!cat3Data1 || !cat3Data2 || !cat3Data3  || !cat3Data4 || !cat3Data5) return;
   // if(!cat3Data1) return;
    	rendercat3();
    	console.log("cat3 is loaded");
  }, 0);
}

//draw all cat1 scatter plots with toggle option to turn display on and off for individual values
function rendercat3(){  
	var selCat3Val1 = g.selectAll("circle.cat3Data1").data(cat3Data1);
	selCat3Val1.exit().remove();
	selCat3Val1
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#E31ECB")
	.classed("cat3Data1", true);
	d3.select("#btn1")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat3Val1.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat3Val1.style("opacity", newOpacity);
			selCat3Val1.active = active;
			console.log("button c3v1 clicked");
			console.log(active);
		});

	var selCat3Val2 = g.selectAll("circle.cat3Data2").data(cat3Data2);
	selCat3Val2.exit().remove();
	selCat3Val2
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#A754C6")
	.classed("cat3Data2", true);
	d3.select("#btn2")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat3Val2.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat3Val2.style("opacity", newOpacity);
			selCat3Val2.active = active;
			console.log("button c3v2 clicked");
			console.log(active);
		});

	var selCat3Val3 = g.selectAll("circle.cat3Data3").data(cat3Data3);
	selCat3Val3.exit().remove();
	selCat3Val3
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#4720DD")
	.classed("cat3Data3", true);
	d3.select("#btn3")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat3Val3.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat3Val3.style("opacity", newOpacity);
			selCat3Val3.active = active;
			console.log("button c3v3 clicked");
			console.log(active);
		});

	var selCat3Val4 = g.selectAll("circle.cat3Data4").data(cat3Data4);
	selCat3Val4.exit().remove();
	selCat3Val4
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#78106B")
	.classed("cat3Data4", true);
	d3.select("#btn4")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat3Val4.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat3Val4.style("opacity", newOpacity);
			selCat3Val4.active = active;
			console.log("button c3v4 clicked");
			console.log(active);
		});

	var selCat3Val5 = g.selectAll("circle.cat3Data5").data(cat3Data5);
	selCat3Val5.exit().remove();
	selCat3Val5
	.enter()
	.append("circle")	
	.attr("cx", function(d) {
		return projection([d.longitude, d.latitude])[0];
	})
	.attr("cy", function(d) {
		return projection([d.longitude, d.latitude])[1];
	})
	.attr("r",2)
	.style("fill", "#856AE1")
	.classed("cat3Data5", true);
	d3.select("#btn5")
		.on("click", function() {
			//determine if current svg is visible
			var active = selCat3Val5.active ? false: true,
				newOpacity = active? 0 : 1;
			//hide or show elements
			selCat3Val5.style("opacity", newOpacity);
			selCat3Val5.active = active;
			console.log("button c3v5 clicked");
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