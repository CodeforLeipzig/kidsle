var map = L.map('map', {
    zoomControl: false,
    maxZoom: 18,
});

var daycarecenters = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

var playgrounds = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

var schools = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

map.addLayer(daycarecenters);
map.addLayer(playgrounds);
map.addLayer(schools);

var posMarker = L.icon({
    iconUrl: posIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

var daycarecenterMarker = L.icon({
    iconUrl: daycarecenterIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

var playMarker = L.icon({
    iconUrl: playgroundIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

var schoolMarker = L.icon({
    iconUrl: schoolIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});


function setUpMap() {
    map.setView([51.34, 12.37], 15);

    new L.Control.Zoom({
        position: 'topright'
    }).addTo(map);

    $('#locate').on('click', function() {
        map.locate({
            setView: true,
            maxZoom: 15,
            icon: posMarker
        });
    });

    function onLocationFound(e) {
        L.marker(e.latlng, {
            icon: posMarker,
            draggable: true
        }).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    var MapNik = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';

    L.tileLayer(MapNik, {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>,under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
        maxZoom: 18
    }).addTo(map);

}

function setUpSortbuttons() {
    var showplay = document.getElementById("play");
    var showdaycarecenter = document.getElementById("kit");
    var showschools = document.getElementById("school");

    showdaycarecenter.addEventListener("click", function() {
        if (showdaycarecenter.clicked === false) {
            showdaycarecenter.clicked = true;
            showdaycarecenter.innerHTML = "daycarecenter ausblenden";
            showdaycarecenter.className = showdaycarecenter.className.replace(/\bbtn-disabled\b/, 'btn-primary');
            map.addLayer(daycarecenters);
        } else {
            showdaycarecenter.clicked = false;
            map.removeLayer(daycarecenters);
            showdaycarecenter.className = showdaycarecenter.className.replace(/\bbtn-primary\b/, 'btn-disabled');
            showdaycarecenter.innerHTML = "daycarecenter anzeigen";
        }
    });

    showplay.addEventListener("click", function() {
        if (showplay.clicked === false) {
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

    showschools.addEventListener("click", function() {
        if (showschools.clicked === false) {
            showschools.clicked = true;
            showschools.innerHTML = "Schulen ausblenden";
            showschools.className = showschools.className.replace(/\bbtn-disabled\b/, 'btn-primary');
            map.addLayer(schools);
        } else {
            showschools.clicked = false;
            map.removeLayer(schools);
            showschools.innerHTML = "Schulen anzeigen";
            showschools.className = showschools.className.replace(/\bbtn-primary\b/, 'btn-disabled');
        }
    });
}

function gatherIconInformation() {

    $.ajax({
        type: 'GET',
        url: daycarecenterDataUrl,
        success: function(data, latlng) {
            for (var i = 0; i < data.length; i++) {
                kita = data[i];
                console.log(kita);
                info_text = '<div class=\"res kita\"><h4>' + kita.name + '</h4></div>' + '<div class=\"kita-content\"><b>' + kita.address + '</b><br/>' + kita.daycare_type + '</b></div>';

                var markerKita = L.marker({
                    lng: parseFloat(kita.longitude),
                    lat: parseFloat(kita.latitude),
                }, {
                    icon: daycarecenterMarker
                }).bindPopup(info_text).addTo(daycarecenters);
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: playgroundDataUrl,
        success: function(data, latlng) {
            for (var i = 0; i < data.length; i++) {
                play = data[i];
                console.log(play);
                var equipment = '';
                for (var j = 0; j < play.equipment.length; j++) {
                    if (j !== 0) {
                        equipment += ', ';
                    }
                    equipment += play.equipment[j].title;
                }
                var gaming_devices = '';
                for (var k = 0; k < play.gaming_devices.length; k++) {
                    if (k !== 0) {
                        gaming_devices += ', ';
                    }
                    gaming_devices += play.gaming_devices[k].title;
                }
                info_text = '<div class=\"res playground\"><h4>' + play.name + '</h4></div>' + '<div class=\"playground-content\"><b>' + play.location + '</b><br/>' + '<h5>Ausstattung:</h5>' + equipment + '<br/><h5>Spielgeräte:</h5>' + gaming_devices + '<br/><h5>Zu Erreichen:</h5>' + play.lines + '</div>';

                var markerPlay = L.marker({
                    lng: parseFloat(play.longitude),
                    lat: parseFloat(play.latitude),
                }, {
                    icon: playMarker
                }).bindPopup(info_text).addTo(playgrounds);
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: schoolDataUrl,
        success: function(data, latlng) {
            for (var i = 0; i < data.length; i++) {
                school = data[i];
                info_text = '<div class=\"res school\"><h4>' + school.name + '</h4></div>' + '<div class=\"school-content\"><b>' + school.street + ', ' + school.post_code + ' ' + school.town + '</b><br/>' + '<h5>Schulart:</h5>' + school.school_type + '</div>';
                var markerPlay = L.marker({
                    lng: parseFloat(school.longitude),
                    lat: parseFloat(school.latitude),
                }, {
                    icon: schoolMarker
                }).bindPopup(info_text).addTo(schools);
            }
        }
    });

}

$(document).ready(function () {
    setUpMap();
    gatherIconInformation();
    setUpSortbuttons();
});
