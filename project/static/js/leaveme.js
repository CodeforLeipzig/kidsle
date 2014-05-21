var map = L.map('map', {
    zoomControl: false
});

new L.Control.Zoom({
    position: 'topright'
}).addTo(map);

var YouIcon = L.icon({
    iconUrl: 'static/img/marker-circle.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});

map.setView([51.34, 12.37], 15);


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
}

L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>,under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    maxZoom: 18
}).addTo(map);



// var schools = ' / schools / data / grundschule.geo.json ';

// var grundsch = L.geoJson(grundschulen, {
//     pointToLayer: function(feature, latlng) {
//         return L.marker(latlng, {
//             icon: gsIcon
//         });
//     },

//     onEachFeature: onEachFeature
// });

// var overlays = {
//     "Grundschulen": grundsch,
//     "Oberschulen": obersch,
//     "Gymnasien": gymnas
// };

// L.control.layers(overlays).addTo(map);