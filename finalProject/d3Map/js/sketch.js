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
	//I understand what this does, but I don't understand how this does it
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

//load the csv files for the 6 most popular language families
	var afroAsiaticData = null;
	var australianData = null;
	var austronesianData = null;
	var indoEuropeanData = null;
	var nigerCongoData = null;
	var sinoTibetanData = null;

	d3.csv("csv/afroAsiatic.csv", function(err, data) {
	  if(err) return console.warn(err);
	  afroAsiaticData = data;
	  finishLoading();
	});
	d3.csv("csv/australian.csv", function(err, data) {
	  if(err) return console.warn(err);
	  australianData = data;
	  finishLoading();
	});
	d3.csv("csv/austronesian.csv", function(err, data) {
	  if(err) return console.warn(err);
	  austronesianData = data;
	  finishLoading();
	});
	d3.csv("csv/indoEuropean.csv", function(err, data) {
	  if(err) return console.warn(err);
	  indoEuropeanData = data;
	  finishLoading();
	});
	d3.csv("csv/nigerCongo.csv", function(err, data) {
	  if(err) return console.warn(err);
	  nigerCongoData = data;
	  finishLoading();
	});
	d3.csv("csv/sinoTibetan.csv", function(err, data) {
	  if(err) return console.warn(err);
	  sinoTibetanData = data;
	  finishLoading();
	});
//check to see whether all the files have loaded before drawing scatter plots
	function finishLoading() {
	  setTimeout(function() {
	    if(!afroAsiaticData || !australianData || !austronesianData || !indoEuropeanData || !nigerCongoData || !sinoTibetanData) return;
	    	renderPoints();
	    	d3.select(".all")
	    		.on("click", function() {
	    			var selA = g.selectAll("circle.afroAsiaticData").data(afroAsiaticData);
					selA.exit().remove();
					selA
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
					.classed("afroAsiaticData", true);
					console.log("button clicked");
				});

	  }, 0);
	}

//draw scatter plots
	function renderPoints(){  
		
		// var selA = g.selectAll("circle.afroAsiaticData").data(afroAsiaticData);
		// selA.exit().remove();
		// selA
		// .enter()
		// .append("circle")	
		// .attr("cx", function(d) {
		// 	return projection([d.longitude, d.latitude])[0];
		// })
		// .attr("cy", function(d) {
		// 	return projection([d.longitude, d.latitude])[1];
		// })
		// .attr("r",2)
		// .style("fill", "red")
		// .classed("afroAsiaticData", true);

		var selB = g.selectAll("circle.australianData").data(australianData);
		selB.exit().remove();
		selB
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
		.classed("australianData", true);

		var selC = g.selectAll("circle.austronesianData").data(austronesianData);
		selC.exit().remove();
		selC
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
		.classed("austronesianData", true);	

		var selD = g.selectAll("circle.indoEuropeanData").data(indoEuropeanData);
		selD.exit().remove();
		selD
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return projection([d.longitude, d.latitude])[0];
		})
		.attr("cy", function(d) {
			return projection([d.longitude, d.latitude])[1];
		})
		.attr("r",2)
		.style("fill", "yellow")
		.classed("indoEuropeanData", true);

		var selE = g.selectAll("circle.nigerCongoData").data(nigerCongoData);
		selE.exit().remove();
		selE.enter()
		.append("circle")
		.attr("cx", function(d) {
			return projection([d.longitude, d.latitude])[0];
		})
		.attr("cy", function(d) {
			return projection([d.longitude, d.latitude])[1];
		})
		.attr("r",2)
		.style("fill", "purple")
		.classed("nigerCongoData", true);
		
		var selF = g.selectAll("circle.sinoTibetanData").data(sinoTibetanData);
		selF.exit().remove();
		selF
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
		.classed("sinoTibetanData", true);
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


/*SCATTER PLOTS */
		//afro-asiatic
		// d3.csv("csv/afroAsiatic.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "red");
		// })
		// console.log("added afro-asiatic family scatter plot");
		// //australian
		// d3.csv("csv/australian.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "blue");
		// })
		// console.log("added australian family scatter plot");
		// //austronesian 
		// d3.csv("csv/austronesian.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "orange");
		// })
		// console.log("added austronesian family scatter plot");
		// //indo-european
		// d3.csv("csv/indoEuropean.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "yellow");
		// })
		// console.log("added indo-european family scatter plot");
		// //niger-congo
		// d3.csv("csv/nigerCongo.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "purple");
		// })
		// console.log("added niger-congo family scatter plot");	
		// //sino-tibetan
		// d3.csv("csv/sinoTibetan.csv", function(error, data) {
		// 	g.selectAll("circle")
		// 		.data(data)
		// 		.enter()
		// 		.append("circle")
		// 		.attr("cx", function(d) {
		// 			return projection([d.longitude, d.latitude])[0];
		// 		})
		// 		.attr("cy", function(d) {
		// 			return projection([d.longitude, d.latitude])[1];
		// 		})
		// 		.attr("r",.5)
		// 		.style("fill", "green");
		// })
		// console.log("added sino-tibetan family scatter plot");	












