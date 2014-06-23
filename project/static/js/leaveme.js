var kitas = new L.LayerGroup();
var playgrounds = new L.LayerGroup();

var overlays = {
    'Kitas': kitas,
    'Spielplaetze': playgrounds
};

var map = L.map('map', {
    zoomControl: false,
    //layers: [kitas, playgrounds]
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
                info_text = '<div class=\"res kitas\"><h4>' + kita.name + '</h4></div>' + '<b>' + kita.address.street + '</b>' + kita.type + '</b>';

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


            info_text = "<div class=\"res playground\"><h4>" + play.title + "</h4></div>" + "<b>" + play.address + "</b><br/><br/>" + "Ausstattung: <br/>" + equipment.join('<br>') + "<br/><br/>Spielgeräte: <br/>" + gaming_devices.join(',<br>');

            var markerPlay = L.marker({
                lng: play['lng'],
                lat: play['lat'],
            }, {
                icon: playMarker
            }).bindPopup(info_text).addTo(playgrounds);
            map.addLayer(playgrounds);

            // (function(text) {
            //     $('.leaflet-marker-icon').click(function() {
            //         $('#infotext').html(text);
            //     });
            // })(info_text);

        }
    }
});
//L.control.layers(null, overlays).addTo(map);

function valplay() {
    if (document.filter.playgrounds.checked == true) {
        map.addLayer(playgrounds);
    } else {
        map.removeLayer(playgrounds);
    }
};

function valkita() {
    if (document.filter.kitas.checked == true) {
        map.addLayer(kitas);
    } else {
        map.removeLayer(kitas);
    }
};