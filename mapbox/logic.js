//console.log('hello', data);

// Use D3 to read in records.csv
d3.csv("/Documents/Project-2-Yelp/mapbox/records.csv").then((data) => {
    data.forEach(function(d) {
        d.review_count = +d.review_count;
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        // d.price = +d.price;
        d.rating = +d.rating;
    });
    console.log(data[0]);

    // 
    
    var restMarkers = [];

    data.forEach(function(d) {
        restMarkers.push(
            L.marker([d.latitude, d.longitude]).bindPopup("<h1>" + d.name + "</h1>")

        );

    })

    var restLayer = L.layerGroup(restMarkers);
    

    //Define variables for our tile layers

    var rating5 = []
    data.forEach(function(d){
    
        if (d.rating == 5) 
        rating5.push(
            L.marker([d.latitude, d.longitude])

        );
    })
    //console.log(rating5[0]);

    var rating45 = []
    data.forEach(function(d){
    
        if (d.rating == 4.5) 
        rating45.push(L.marker([d.latitude, d.longitude]));
    });
    //console.log(rating45[0]);

    var rating4 = []
    data.forEach(function(d){
    
        if (d.rating == 4) 
        rating4.push(L.marker([d.latitude, d.longitude]));
    });
    //console.log(rating4[0]);

    var rating35 = []
    data.forEach(function(d){
    
        if (d.rating == 3.5) 
        rating35.push(L.marker([d.latitude, d.longitude]));
    });
    //console.log(rating35[0]);

    var rating3 = []
    data.forEach(function(d){
    
        if (d.rating == 3) 
        rating3.push(L.marker([d.latitude, d.longitude]));
    });
    //console.log(rating3[0]);

    var rating25 = []
    data.forEach(function(d){
    
        if (d.rating == 2.5) 
        rating25.push(L.marker([d.latitude, d.longitude]));
    });
    //console.log(rating25[0]);

    //Create layer groups
    var five = L.layerGroup(rating5);
    var fourfive = L.layerGroup(rating45);
    var four = L.layerGroup(rating4);
    var threefive = L.layerGroup(rating35);
    var three = L.layerGroup(rating3);
    var twofive = L.layerGroup(rating25);

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    });

    // Create a baseMaps object
    var baseMaps = {
    "Street Map": streetmap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Rating 5": five,
    "Rating 4.5": fourfive,
    "Rating 4": four,
    "Rating 3.5": threefive,
    "Rating 3": three,
    "Rating 2.5": twofive
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, five, fourfive, four, threefive, three, twofive]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
});