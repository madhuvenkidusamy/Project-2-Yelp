// Use D3 to read in records.csv
d3.csv("/Documents/Project-2-Yelp/plotly/data/records.csv").then((data) => {

    data.forEach(function(d) {
        d.review_count = +d.review_count;
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        d.price = +d.price;
        d.rating = +d.rating;
      });
      console.log(data[0]);

    // Set dropdown1
    var cities1 = []
    data.forEach(function(d){
        
        if (cities1.includes(d.location) === false) 
        cities1.push(d.location);

    });
    console.log(cities1)
    for (var i = 0; i < cities1.length; i++) {
        selectBox = d3.select("#selDataset1");
        selectBox.append("option").text(cities1[i]);
    }
    
    // Set dropdown2
    var rating1 = []
    data.forEach(function(d){
        
        if (rating1.includes(d.rating) === false) 
        rating1.push(d.rating);

    });
    rating1.sort()
    rating1.reverse()
    console.log(rating1)
    for (var i = 0; i < rating1.length; i++) {
        selectBox = d3.select("#selDataset2");
        selectBox.append("option").text(rating1[i]);
    }
    // Set dropdown3
    var cities2 = []
    data.forEach(function(d){
        
        if (cities2.includes(d.location) === false) 
        cities2.push(d.location);

    });
    for (var i = 0; i < cities2.length; i++) {
        selectBox = d3.select("#selDataset3");
        selectBox.append("option").text(cities2[i]);
    }
    // Set dropdown4
    
    for (var i = 0; i < rating1.length; i++) {
        selectBox = d3.select("#selDataset4");
        selectBox.append("option").text(rating1[i]);
    }
    //var categories = []
    //data.forEach(function(d){
        
        //if (categories.includes(d.category) === false) 
        //categories.push(d.category);

    //});
    //console.log(categories)

    //var quantity = []
    //data.forEach(function(d) {
        //if (data.category[i] == categories[i]) {
            //quantity.push()
        //}
    //});
    //console.log(quantity)
    var allCategories = []
    data.forEach(function(d){
        
        //if (categories.includes(d.category) === false) 
        allCategories.push(d.category);

    });
    //console.log(allCategories)
    const map = allCategories.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    cat = map.keys(allCategories);
    //console.log(cat)
    
    quant = map.values(allCategories)
    //console.log(quant)
    
    var arr = Array.from(map.entries());
    sortedArr = arr.sort(function(a, b){return b[1]-a[1]})
    console.log(sortedArr)

    var categories = arr.map(function(value,index) {return value[0]; });
    console.log(categories);
    var quantity = arr.map(function(value,index) {return value[1]; });
    console.log(quantity);
   

    //quantity = {};
    //for(var i=1; i<categories.length; ++i) {
        //if(!quantity[categories[i]])
            //quantity[categories[i]] = 0;
            //++quantity[categories[i]];
    //}
    //console.log(quantity);
    // Default Plot
    
    function init() {

        var dropdownMenu1 = d3.select("#selDataset1");
        var dropdownMenu2 = d3.select("#selDataset2");
        // Assign the value of the dropdown menu option to a variable
        var dataset1 = dropdownMenu1.property("value");
        console.log(dataset1)
        var dataset2 = dropdownMenu2.property("value");
        console.log(dataset2)
        // Initialize an empty array for the country's data
        var data1 = [];
        data.forEach(function(d) {
            if (data.location == dataset1 && data.rating == dataset2)
            data1.push(data.category)
        })
        console.log(data1)
        const map = data1.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        cat2 = map.keys(data1);
        //console.log(cat2)
        quant2 = map.values(data1)
        //console.log(quant2)
        var arr2 = Array.from(map.entries());
        //console.log(arr2)
        sortedArr2 = arr2.sort(function(a, b){return b[1]-a[1]})
        var categories2 = sortedArr2.map(function(value,index) {return value[0]; });
        console.log(categories2);
        var quantity2 = sortedArr2.map(function(value,index) {return value[1]; });
        console.log(quantity2);

        
        
        // Slice

        var slicedQuantity = quantity2.slice(0,10);
        var slicedCategories = categories2.slice(0,10);
        //var slicedLabels = labels.slice(0, 10);

        // Reverse

        var reversedQuantity = slicedQuantity.reverse();
        var reversedCategories = slicedCategories.reverse();
        //var reversedLabels = slicedLabels.reverse();

    
        // trace
        var trace1 = {
        x: reversedQuantity,
        y: reversedCategories,
        //text: reversedLabels,
        type: "bar",
        orientation: "h"
        };
        //data
        var barData = [trace1];
        //layout
        var layout = {
            margin: {
                l:100,
                r:100,
                t:100,
                b:100
            }
        };
        
        Plotly.newPlot("bar1", barData, layout);
    }
    // On change to the DOM, call getData()
    d3.selectAll("#selDataset1","#selDataset2").on("change", getData);

    // Function called by DOM changes
    function getData() {
    var dropdownMenu1 = d3.select("#selDataset1");
    var dropdownMenu2 = d3.select("#selDataset2");
    // Assign the value of the dropdown menu option to a variable
    var dataset1 = dropdownMenu1.property("value");
    var dataset2 = dropdownMenu2.property("value");
    // Initialize an empty array for the country's data
    var barData = [];
    data.forEach(function(d) {
        if (data.location == dataset1 && data.rating == dataset2)
        barData.push(data.category)
    })
    //console.log(barData)
    const map9 = barData.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    cat9 = map9.keys(barData);
    //console.log(cat2)
    quant9 = map9.values(barData)
    //console.log(quant2)
    var arr9 = Array.from(map9.entries());
    //console.log(arr2)
    sortedArr9 = arr9.sort(function(a, b){return b[1]-a[1]})
    var categories9 = sortedArr9.map(function(value,index) {return value[0]; });
    console.log(categories9);
    var quantity9 = sortedArr9.map(function(value,index) {return value[1]; });
    console.log(quantity9);

    // Slice

    var slicedQuantity9 = quantity9.slice(0,10);
    var slicedCategories9 = categories9.slice(0,10);
    //var slicedLabels = labels.slice(0, 10);

    // Reverse

    var reversedQuantity9 = slicedQuantity9.reverse();
    var reversedCategories9 = slicedCategories9.reverse();
    //var reversedLabels = slicedLabels.reverse();

    updatePlotly(reversedQuantity9, reversedCategories9);
    }

    // Update the restyled plot's values
    function updatePlotly(newdata1, newdata2) {
    Plotly.restyle("bar1", "x", [newdata1], "y", [newdata2]);
    }

    init();

    function init1() {

        var dropdownMenu3 = d3.select("#selDataset3");
        var dropdownMenu4 = d3.select("#selDataset4");
        // Assign the value of the dropdown menu option to a variable
        var dataset3 = dropdownMenu3.property("value");
        console.log(dataset3)
        var dataset4 = dropdownMenu4.property("value");
        console.log(dataset4)
        // Initialize an empty array for the country's data
        var data2 = [];
        data.forEach(function(d) {
            if (data.location == dataset3 && data.rating == dataset4)
            data2.push(data.category)
        })
        console.log(data2)
        const map = data2.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        cat3 = map.keys(data2);
        //console.log(cat2)
        quant3 = map.values(data2)
        //console.log(quant2)
        var arr3 = Array.from(map.entries());
        //console.log(arr2)
        sortedArr3 = arr3.sort(function(a, b){return b[1]-a[1]})
        var categories3 = sortedArr3.map(function(value,index) {return value[0]; });
        console.log(categories3);
        var quantity3 = sortedArr3.map(function(value,index) {return value[1]; });
        console.log(quantity3);

        
        
        // Slice

        var slicedQuantity3 = quantity3.slice(0,10);
        var slicedCategories3 = categories3.slice(0,10);
        //var slicedLabels = labels.slice(0, 10);

        // Reverse

        var reversedQuantity3 = slicedQuantity3.reverse();
        var reversedCategories3 = slicedCategories3.reverse();
        //var reversedLabels = slicedLabels.reverse();

    
        // trace
        var trace2 = {
        x: reversedQuantity3,
        y: reversedCategories3,
        //text: reversedLabels,
        type: "bar",
        orientation: "h"
        };
        //data
        var barData2 = [trace2];
        //layout
        var layout2 = {
            margin: {
                l:100,
                r:100,
                t:100,
                b:100
            }
        };
        
        Plotly.newPlot("bar2", barData2, layout2);
    }
    // On change to the DOM, call getData()
    d3.selectAll("#selDataset3","#selDataset4").on("change", getData2);

    // Function called by DOM changes
    function getData2() {
    var dropdownMenu3 = d3.select("#selDataset3");
    var dropdownMenu4 = d3.select("#selDataset4");
    // Assign the value of the dropdown menu option to a variable
    var dataset3 = dropdownMenu3.property("value");
    var dataset4 = dropdownMenu4.property("value");
    // Initialize an empty array for the country's data
    var barData2 = [];
    data.forEach(function(d) {
        if (data.location == dataset3 && data.rating == dataset4)
        barData2.push(data.category)
    })
    //console.log(barData)
    const map8 = barData2.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    cat8 = map8.keys(barData2);
    //console.log(cat2)
    quant8 = map8.values(barData2)
    //console.log(quant2)
    var arr8 = Array.from(map8.entries());
    //console.log(arr2)
    sortedArr8 = arr8.sort(function(a, b){return b[1]-a[1]})
    var categories8 = sortedArr8.map(function(value,index) {return value[0]; });
    console.log(categories8);
    var quantity8 = sortedArr8.map(function(value,index) {return value[1]; });
    console.log(quantity8);

    // Slice

    var slicedQuantity8 = quantity8.slice(0,10);
    var slicedCategories8 = categories8.slice(0,10);
    //var slicedLabels = labels.slice(0, 10);

    // Reverse

    var reversedQuantity8 = slicedQuantity8.reverse();
    var reversedCategories8 = slicedCategories8.reverse();
    //var reversedLabels = slicedLabels.reverse();

    updatePlotly(reversedQuantity8, reversedCategories8);
    }

    // Update the restyled plot's values
    function updatePlotly(newdata3, newdata4) {
    Plotly.restyle("bar2", "x", [newdata3], "y", [newdata4]);
    }

    init1();

    // Set dropdown5 for third bar chart: qty of restaurants by city filtering by rating
    
    for (var i = 0; i < rating1.length; i++) {
        selectBox = d3.select("#selDataset5");
        selectBox.append("option").text(rating1[i]);
    }
    var dropdownMenu5 = d3.select("#selDataset5");
    // Assign the value of the dropdown menu option to a variable
    var dataset5 = dropdownMenu5.property("value");
    var fivestars = []
    data.forEach(function(d){
        if (d.rating == dataset5)
        fivestars.push(d.location)

    })
    console.log(fivestars)
    const map3 = fivestars.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    keys = map3.keys(fivestars);
    //console.log(cat2)
    value = map3.values(fivestars)
    //console.log(quant2)
    var arr4 = Array.from(map3.entries());
    //console.log(arr4[0])
    var citiesrating = arr4.map(function(value,index) {return value[0]; });
    console.log(citiesrating);
    var quantityrating = arr4.map(function(value,index) {return value[1]; });
    console.log(quantityrating);
    // trace
    var trace4 = {
        x: citiesrating,
        y: quantityrating,
        //text: reversedLabels,
        type: "bar",
        orientation: "v"
        };
    //data
    var barData4 = [trace4];
    //layout
    var layout4 = {
        margin: {
            l:100,
            r:100,
            t:100,
            b:100
        }
    };
            
    Plotly.newPlot("bar3", barData4, layout4);
    
    // On change to the DOM, call getData()
    d3.selectAll("#selDataset5").on("change", getData3);

    // Function called by DOM changes
    function getData3() {
    var dropdownMenu5 = d3.select("#selDataset5");
    console.log(dropdownMenu5);
    // Assign the value of the dropdown menu option to a variable
    
    var dataset5 = dropdownMenu5.property("value");
    console.log(dataset5);
    // Initialize an empty array for the country's data
    var barData4 = [];
    data.forEach(function(d){
        if (d.rating == dataset5)
        barData4.push(d.location)

    })
    console.log(barData4);
    const map4 = barData4.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    keys = map4.keys(barData4);
    console.log(keys)
    value = map4.values(barData4)
    console.log(value)
    var arr5 = Array.from(keys);
    var arr6 = Array.from(value);
    console.log(arr5)
    console.log(arr6)
    // var citiesrating1 = arr5.map(function(value,index) {return value[0]; });
    // console.log(citiesrating);
    // var quantityrating1 = arr5.map(function(value,index) {return value[1]; });
    // console.log(quantityrating);

    //updatePlotly3(arr5, arr6);
    // trace
    var trace5 = {
        x: arr5,
        y: arr6,
        //text: reversedLabels,
        type: "bar",
        orientation: "v"
        };
    //data
    var barData5 = [trace5];
    //layout
    var layout5 = {
        margin: {
            l:100,
            r:100,
            t:100,
            b:100
        }
    };
            
    Plotly.newPlot("bar3", barData5, layout5);
    }

    // Update the restyled plot's values
    //function updatePlotly3(newdata5, newdata6) {
    //console.log(newdata5, newdata6);
    //Plotly.restyle("bar3", "x", [newdata5], "y", [newdata6]);
    //}
    
    //Scatter price-rating
    var ratings = []
    data.forEach(function(d){
    
        ratings.push(d.rating);

    });
    console.log(ratings)

    var prices = []
    data.forEach(function(d){
    
        prices.push(d.price);

    });
    console.log(prices)
    
    trace3 = {
        x: ratings,
        y: prices,
        mode: 'markers',
        type: 'scatter',
        marker: { 
            size: 12
            //opacity: [1, 0.8, 0.6, 0.4]
        }
    };

    var data3 = [trace3];

    var layout = {
        xaxis: {
            range: [0, 6],
            label: "Rating"
        },
        yaxis: {
            range: [0, 5],
            label: "Price"
        },
        
        title: 'Price vs Rating'
    };
    Plotly.newPlot("scatter", data3, layout);


});
            
