var map, GeoMarker;

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/static/data/grundschule.geo.json', true);
// xhr.onload = function() {
//   loadGrundschule(this.responseText);
// };
// xhr.send();
//
// function callback(results) {
//   for (var i = 0; i < results.length; i++) {
//     var geoJsonObject = results.features[i];
//     var geometry = geoJsonObject.geometry;
//   }
// };
//
//
// var googleMapsVector = new GeoJSON(geojson, googleOptions);
// googleMapsVector.setMap(map);


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

    styles:
    [{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#71ABC3"},{"saturation":-10},{"lightness":-21},{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"hue":"#7DC45C"},{"saturation":37},{"lightness":-27},{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{ "color": "#ebebeb" }]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#A19FA0"},{"saturation":-98},{"lightness":-20},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#FFFFFF"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]}]

  };


  var schools = '/static/data/grundschule.geo.json';
  var gym   = '/static/data/gymnasium.geo.json';

  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);


  scopt = {
   icon: '/static/img/pin-marker.svg'
  };
  //
  // scopt = map.data.setStyle({
  //   icon: '/static/img/playground2.svg'
  // });
  // var test1 = map.data.addGeoJson(geoJson:schools, options?:scopt);



  map.data.loadGeoJson(schools, gym);
  map.data.setStyle(scopt);




  // map.data.foreEach(function(feature) {console.log(feature);})


  // var datalayer = new google.maps.Data(map);
  //     datalayer.addGeoJson(schools);
  //     // datalayer.setStyle(scopt);
  //     datalayer.setMap(map);

  // map.data.setStyle(scopt);
  //
  //
  // map.data.addListener('click', function(event) {
  //    map.data.overrideStyle(event.feature, {icon: '/static/img/school.svg'});
  // });

  //
  // function  loadGeoJSON(data){
  //
  //   var json = JSON.parse(data);
  //   var features = new GeoJSON(json, style);
  //
  //   // Loop through each feature
  //   for (var i = 0; i < features.length; i++){
  //     features[i].setMap(map);
  //   }
  // };

  // scopt2 = map.data.setStyle({
  //   icon: '/static/img/playground.svg'
  // });
  // map.data.loadGeoJson(gym, scopt2);


/* Just for testing purpose Icon Markers */

  // var plLatlng = new google.maps.LatLng(51.327, 12.339);
  //
  // var playground = new google.maps.Marker({
  //   map: map,
  //   position: plLatlng,
  //   icon: '/static/img/playground2.svg'
  // });
  //
  // var scLatlng = new google.maps.LatLng(51.345, 12.336);
  //
  // var playground = new google.maps.Marker({
  //   map: map,
  //   position: scLatlng,
  //   icon: '/static/img/school.svg'
  // });
  //
  //
  // var ktLatlng = new google.maps.LatLng(51.329, 12.331);
  //
  // var playground = new google.maps.Marker({
  //   map: map,
  //   position: ktLatlng,
  //   icon: '/static/img/kita.svg'
  // });

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      var image = new google.maps.MarkerImage('/static/img/marker-circle.svg',
        new google.maps.Size(32, 32),
        new google.maps.Point(0, 0),
        new google.maps.Point(16, 16));

      var mymarker = new google.maps.Marker({
        map: map,
        clickable: false,
        icon: image,
        draggable: true,
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
  var content = 'Error: Your browser doesn\'t support geolocation.';
  if (errorFlag) {
    content = 'Error: The Geolocation service failed.';
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

if(!navigator.geolocation) {
        alert('Your browser does not support geolocation');
      }
