// Define worldMap tile layer
//-----------------------------
let worldMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
});

// Define the myMap with center coords and zoom
//-----------------------------
let myMap = L.map("mapid", {
    center: [
        37.10, -95.72
    ],
    zoom: 3,

});

worldMap.addTo(myMap);

// Define url to grab json data
//-----------------------------
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Read the json using D3
d3.json(url, function (geojson) {
    console.log(geojson);

    // add style to my earthquake features
    // function earthquakeStyle(features)
    L.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },  
        
        
        
        
    }).addTo(myMap)

})
