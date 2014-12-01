var daycarecenters = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

var playgrounds = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

var schools = new L.MarkerClusterGroup({
    showCoverageOnHover: true
});

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

function setUpMap(map, options) {

    map.addLayer(daycarecenters);
    map.addLayer(playgrounds);
    map.addLayer(schools);

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

    gatherIconInformation(map);
    setUpSortbuttons(map);

}

function setUpSortbuttons(map) {

    if (daycareActive) {
        var showdaycarecenter = document.getElementById("kit");
        showdaycarecenter.addEventListener("click", function() {
            if (showdaycarecenter.clicked === false) {
                showdaycarecenter.clicked = true;
                showdaycarecenter.innerHTML = "Kitas ausblenden";
                showdaycarecenter.className = showdaycarecenter.className.replace(/\bbtn-disabled\b/, 'btn-primary');
                map.addLayer(daycarecenters);
            } else {
                showdaycarecenter.clicked = false;
                map.removeLayer(daycarecenters);
                showdaycarecenter.className = showdaycarecenter.className.replace(/\bbtn-primary\b/, 'btn-disabled');
                showdaycarecenter.innerHTML = "Kitas anzeigen";
            }
        });
    }

    if (playgroundsActive) {
        var showplay = document.getElementById("play");
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
    }

    if (schoolsActive) {
        var showschools = document.getElementById("school");
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
}

function gatherIconInformation() {

    if (daycareActive) {
        $.ajax({
            type: 'GET',
            url: daycarecenterDataUrl,
            success: function(data, latlng) {
                for (var i = 0; i < data.length; i++) {
                    kita = data[i];
                    info_text = '<div class=\"results-header kita\"><h4>' + kita.name + '</h4></div>' + '<div class=\"kita-content results-body\"><b>' + kita.address + '</b><br/>' + kita.daycare_type + '</b></div>';

                    var markerKita = L.marker({
                        lng: parseFloat(kita.longitude),
                        lat: parseFloat(kita.latitude),
                    }, {
                        icon: daycarecenterMarker
                    }).bindPopup(info_text).addTo(daycarecenters);
                }
            }
        });
    }

    if (playgroundsActive) {
        $.ajax({
            type: 'GET',
            url: playgroundDataUrl,
            success: function(data, latlng) {
                for (var i = 0; i < data.length; i++) {
                    play = data[i];
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
                    info_text = '<div class=\"results-header playground\"><h4>' + play.name + '</h4></div>' + '<div class=\"playground-content results-body\"><b>' + play.location + '</b><br/>' + '<h5>Ausstattung:</h5>' + equipment + '<br/><h5>Spielgeräte:</h5>' + gaming_devices + '<br/><h5>Zu Erreichen:</h5>' + play.lines + '</div>';

                    var markerPlay = L.marker({
                        lng: parseFloat(play.longitude),
                        lat: parseFloat(play.latitude),
                    }, {
                        icon: playMarker
                    }).bindPopup(info_text).addTo(playgrounds);
                }
            }
        });
    }

    if (schoolsActive) {
        $.ajax({
            type: 'GET',
            url: schoolDataUrl,
            success: function(data, latlng) {
                for (var i = 0; i < data.length; i++) {
                    school = data[i];
                    info_text = '<div class=\"results-header school\"><h4>' + school.name + '</h4></div>' + '<div class=\"school-content results-body\"><b>' + school.street + ', ' + school.post_code + ' ' + school.town + '</b><br/>' + '<h5>Schulart:</h5>' + school.school_type + '</div>';
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

}


