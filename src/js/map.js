var map;

function initialize() {
  var mapOptions = {
    zoom: 14,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
    },
    panControl: true,
    panControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    scaleControl: true,

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
        "visibility":"on"
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


  /* Just for testing purpose Icon Markers */
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var plLatlng = new google.maps.LatLng(51.327, 12.339);

  var playground = new google.maps.Marker({
    map: map,
    position: plLatlng,
    icon: 'src/img/playground2.svg'
  });

  var scLatlng = new google.maps.LatLng(51.345, 12.336);

  var playground = new google.maps.Marker({
    map: map,
    position: scLatlng,
    icon: 'src/img/school.svg'
  });


  var ktLatlng = new google.maps.LatLng(51.329, 12.331);

  var playground = new google.maps.Marker({
    map: map,
    position: ktLatlng,
    icon: 'src/img/kita.svg'
  });



  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      var image = new google.maps.MarkerImage('src/img/marker-circle.svg',
        new google.maps.Size(32, 32),
        new google.maps.Point(0, 0),
        new google.maps.Point(16, 16));

      var mymarker = new google.maps.Marker({
        map: map,
        clickable: false,
        icon: image,
        position: pos
      });

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Deine Position'
      });

      mymarker.setMap(map);

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
