/*
* This script helps to generate dymanic polygons, without google maps drawing tools
* I used the "ID - a unique ID/name generator for JavaScript" script by gordonbrander (https://gist.github.com/gordonbrander) that helped me to generate an unique id
* for polygons storage in PolygonObject I created
*/

var PolygonObj = {};//This object contains the polygon, the array path line and line asociated
var actualId = false;//This var contains the id of polygon under construction, when there are no lines of polygon under contruction, its value is false
var strokeColor = '#467BD8'; //This var contains the stroke color for line and polygon
var fillColor = '#7FA7EF'; //This var contains the polygon fill color

/**
* TThis function provide a way to generate a line that will be the bounds of your polygon.
* When you click the first point of the created line, and the array line path is bigger than 3,
* the polygone is created and the line is purged
*/
function addLine(event){
	var latLng = event.latLng;
	if(!actualId){
		var path = [latLng];
		var cod = ID();
		var line = new google.maps.Polyline({
		    path: path,
		    geodesic: true,
		    cod:cod,
		    strokeColor: strokeColor,
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    editable:true,
		    draggable: true,
		    map:map
	  	});

		line.addListener('click',function(event){
			var polygon = PolygonObj[actualId];
			
			var thisLat = event.latLng.lat();
			var	thisLng = event.latLng.lng();
			var polygonLat = polygon.path[0].lat();
			var polygonLng = polygon.path[0].lng();

			var equals = (thisLat == polygonLat && thisLng == polygonLng);

			if(polygon.path.length > 2 ){
				if(equals){
					var path = polygon.path;
					path.push(event.latLng);
					var dynamicPolygon = new google.maps.Polygon({
					    paths: path,
					    strokeColor: strokeColor,
					    strokeOpacity: 0.8,
					    strokeWeight: 2,
					    fillColor: fillColor,
					    fillOpacity: 0.35,
					    map:map,
					    editable:true,
					    draggable: true,
				  	});
				  	PolygonObj[actualId].path = path;
				  	PolygonObj[actualId].polygon = dynamicPolygon;
				  	PolygonObj[actualId].line.setMap(null);
				  	PolygonObj[actualId].line = null;
				  	actualId = false;
			  	}
			}
		});

	  	PolygonObj[cod] = {
	  		line: line,
	  		path: path
	  	};
		actualId = cod;
	}else{

		var polygon = PolygonObj[actualId];
		var path  = polygon.line.getPath();
		var line = polygon.line;
		path.push(latLng);
		polygon.path = path.getArray();
		line.setPath(path);
	}
}

function getPolygonCodes(){
	return Object.keys(PolygonObj);
}