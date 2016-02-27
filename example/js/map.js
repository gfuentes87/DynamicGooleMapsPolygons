var map;
$(function(){
	var mapDiv = document.getElementById('map');
  	map = new google.maps.Map(mapDiv, {
          center: {lat: -33.425412, lng: -70.566567},
          zoom: 8
        });

  	map.addListener('click',function(event){
  		addLine(event);
  	});
});