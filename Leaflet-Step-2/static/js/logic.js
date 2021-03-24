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
    zoom: 4,

});

worldMap.addTo(myMap);

// Define url to grab json data
//-----------------------------
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



// Read the json using D3
//-----------------------------
d3.json(url, function (geojson) {
    console.log(geojson);

    // add style to my earthquake features
    function earthQuakeStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: .8,
            fillColor: earthQuakeColor(feature.properties.mag),
            radius: earthQuakeRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
            
        };

    }
    // add color to earthquake using switch conditionals
    //-----------------------------
    function earthQuakeColor(mag) {
        switch (true) {
            case mag > 5:
                return "#eb3636";
            case mag > 4:
                return "#f0af32";
            case mag > 3:
                return "#d6ed1f";
            case mag > 2:
                return "#8ce61e";
            case mag > 1:
                return "#1ee8ba";
            default:
                return "#2c90ea";
        }



    }

    // Function for controling legend color
    function legendColor(mag) {
        switch (true) {
            case mag > 100:
                return "#eb3636";
            case mag > 70:
                return "#f0af32";
            case mag > 50:
                return "#d6ed1f";
            case mag > 30:
                return "#8ce61e";
            case mag > 10:
                return "#1ee8ba";
            default:
                return "#2c90ea";
        }
    }

    // Adding legend to the map
    //-----------------------------
    let legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function () {
        // div element for legend
        let div = L.DomUtil.create('div', 'info legend');
        // legend numbers
        let grades = [-10, 10, 30, 50, 70, 90];  
        // loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<div style="background: ' + legendColor(grades[i] + 20) + ";" + "width: 25px; height: 25px; display: inline-block;"  +' " ></div> '  +
                grades[i] + (grades[i + 1] ? " " + '&ndash;' +" " + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
    // add radius size determined by magnitude of earthquake
    //-----------------------------
    function earthQuakeRadius(mag) {
        if (mag === 0) {
            return 1;
        }

        return mag * 3;

    }

    // Grab the data with D3
    //-----------------------------
    L.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: earthQuakeStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

        }
        
    }).addTo(myMap);








});
