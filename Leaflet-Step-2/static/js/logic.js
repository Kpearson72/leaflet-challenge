// URL to earthquake json data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// add radius size determined by magnitude of earthquake
//-----------------------------
function earthQuakeRadius(mag) {
    if (mag === 0) {
        return 1;
    }

    return mag * 5;

}

// function to return the color based on magnitude

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


// GET request, and function to handle returned JSON data
d3.json(url, function (data) {

    var earthquakes = L.geoJSON(data.features, {
        onEachFeature: addPopup,
        pointToLayer: earthQuakeStyle
    });

    // call function to create map
    createMap(earthquakes);

});

function earthQuakeStyle(feature, location) {
    var options = {
        stroke: false,
        fillOpacity: .5,
        fillColor: earthQuakeColor(feature.properties.mag),
        radius: earthQuakeRadius(feature.properties.mag),
        stroke: true,
        weight: 0.8
    }

    return L.circleMarker(location, options);

}

// Define a function we want to run once for each feature in the features array
function addPopup(feature, layer) {
    // Give each feature a popup describing the place and time of the earthquake
    return layer.bindPopup(`<h3> ${feature.properties.place} </h3> <hr> <h4>Magnitude: ${feature.properties.mag} </h4> <p> ${Date(feature.properties.time)} </p>`);
}

// function to receive a layer of markers and plot them on a map.
function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var greyscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox/dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Satellite": satellite,
        "Greyscale": greyscale,
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("mapid", {
        center: [
            37.10, -95.72
        ],
        zoom: 4,
        layers: [satellite,  earthquakes, greyscale]
    });

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

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}