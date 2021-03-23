// Define streetmap and darkmap layers
let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
let myMap = L.map("mapid", {
    center: [
        37.10, -95.72
    ],
    zoom: 3,

});

streetmap.addTo(myMap);

