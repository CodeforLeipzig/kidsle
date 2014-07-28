var kitas = new L.MarkerClusterGroup({
    showCoverageOnHover: false
});
var playgrounds = new L.MarkerClusterGroup({
    showCoverageOnHover: false
});

var map = L.map('map', {
    zoomControl: false,
});


var posIcon = 'static/img/marker-circle.svg';
//var schoolIcon = 'static/img/school.svg';
var kitaIcon = 'static/img/kita.svg';
var playIcon = 'static/img/playground.svg';

var kitaData = 'static/data/kitas.json';
var playData = 'static/data/playgrounds.json';

var YouIcon = L.icon({
    iconUrl: posIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// var schoolMarker = L.icon({
//     iconUrl: schoolIcon,
//     iconSize: [32, 32],
//     iconAnchor: [16, 16],
// });

var kitaMarker = L.icon({
    iconUrl: kitaIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

var playMarker = L.icon({
    iconUrl: playIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

map.setView([51.34, 12.37], 15);

new L.Control.Zoom({
    position: 'topright'
}).addTo(map);

$('#locate').on('click', function() {
    map.locate({
        setView: true,
        maxZoom: 15,
        icon: YouIcon
    });
});

map.on('locationfound', onLocationFound);

function onLocationFound(e) {
    L.marker(e.latlng, {
        icon: YouIcon,
        draggable: true
    }).addTo(map);
};

var MapBox = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
var MapNik = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';

L.tileLayer(MapNik, {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>,under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    maxZoom: 18
}).addTo(map);

$.ajax({
    type: 'GET',
    url: kitaData,
    success: function(data, latlng) {
        for (var i = 0; i < data.length; i++) {
            kita = data[i];
            if (typeof kita['address'] == 'object') {
                info_text = '<div class=\"res kita\"><h4>' + kita.name + '</h4></div>' + '<div class=\"kita-content\"><b>' + kita.address.street + '</b><br/>' + kita.type + '</b></div>';

                var markerKita = L.marker({
                    lng: kita['address']['lng'],
                    lat: kita['address']['lat'],
                }, {
                    icon: kitaMarker
                }).bindPopup(info_text).addTo(kitas);
                map.addLayer(kitas);
            }
        }
    }
});


$.ajax({
    type: 'GET',
    url: playData,
    success: function(data, latlng) {
        for (var i = 0; i < data.length; i++) {
            play = data[i];
            equipment = $.grep(play.equipment, function(element) {
                return element.trim().length !== 0;
            });
            gaming_devices = $.grep(play.gaming_devices, function(element) {
                return element.trim().length !== 0;
            });
            local_traffic = play.local_traffic;

            info_text = '<div class=\"res playground\"><h4>' + play.title + '</h4></div>' + '<div class=\"playground-content\"><b>' + play.address + '</b><br/>' + '<h5>Ausstattung:</h5>' + equipment.join('<br>') + '<br/><h5>Spielgeräte:</h5>' + gaming_devices.join(', <br/> ') + '<br/><h5>Zu Erreichen:</h5>' + local_traffic.join(',') + '</div>';

            var markerPlay = L.marker({
                lng: play['lng'],
                lat: play['lat'],
            }, {
                icon: playMarker
            }).bindPopup(info_text).addTo(playgrounds);
            map.addLayer(playgrounds);
        }
    }
});



var showplay = document.getElementById("play");
var showkitas = document.getElementById("kit");

showkitas.addEventListener("click", function() {
    if (showkitas.clicked == false) {
        showkitas.clicked = true;
        showkitas.innerHTML = "Kitas ausblenden";
        showkitas.className = showkitas.className.replace(/\bbtn-disabled\b/, 'btn-primary');
        map.addLayer(kitas);
    } else {
        showkitas.clicked = false;
        map.removeLayer(kitas);
        showkitas.className = showkitas.className.replace(/\bbtn-primary\b/, 'btn-disabled');
        showkitas.innerHTML = "Kitas anzeigen";
    }
});

showplay.addEventListener("click", function() {
    if (showplay.clicked == false) {
        showplay.clicked = true;
        showplay.innerHTML = "Spielplätze ausblenden";
        showplay.className = showplay.className.replace(/\bbtn-disabled\b/, 'btn-primary');
        map.addLayer(playgrounds);
    } else {
        showplay.clicked = false;
        map.removeLayer(playgrounds);
        showplay.innerHTML = "Spielplätze anzeigen";
        showplay.className = showplay.className.replace(/\bbtn-primary\b/, 'btn-disabled');
    }
});







//spacer