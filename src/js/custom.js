var map;

function initialize() {
  var mapOptions = {
    zoom: 12,
    styles: [{
      "featureType":"administrative",
      "stylers":[{
        "visibility":"off"
      }]
    },{
      "featureType":"poi",
      "stylers":[{
        "visibility":"simplified"
      }]
    },{
      "featureType":"road",
      "stylers":[{
        "visibility":"simplified"
      }]
    },{
      "featureType":"water",
      "stylers":[{
        "visibility":"simplified"
      }]
    },{
      "featureType":"transit",
      "stylers":[{
        "visibility":"simplified"
      }]
    },{
      "featureType":"landscape",
      "stylers":[{
        "visibility":"simplified"
      }]
    },{
      "featureType":"road.highway",
      "stylers":[{
        "visibility":"off"
      }]
    },{
      "featureType":"road.local",
      "stylers":[{
        "visibility":"on"
      }]
    },{
      "featureType":"road.highway",
      "elementType":"geometry",
      "stylers":[{
        "visibility":"on"
      }]
    },{
      "featureType":"road.arterial",
      "stylers":[{
        "visibility":"off"
      }]
    },{
      "featureType":"water",
      "stylers":[{
        "color":"#5f94ff"
      },{
        "lightness":26
      },{
        "gamma":5.86
      }]
    },{
      "featureType":"road.highway",
      "stylers":[{
        "weight":0.6
      },{
        "saturation":-85
      },{
        "lightness":61
      }]
    },{
      "featureType":"road"
    },{
      "featureType":"landscape",
      "stylers":[{
        "hue":"#0066ff"
      },{
        "saturation":74
      },{
        "lightness":100
      }]
    }]
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'du bist hier'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(51.33, 12.33),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
