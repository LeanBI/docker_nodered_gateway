(function() {
    var chartID = "myChartSimple1";           // set this to the id you have specified in the canvas tag above
    // setup the chart definition as defined in the chart.js documentation, in addition setting up the topic
    // for each channel
    var chartDef = {
        type: 'line',
        data: {
            datasets: [{
                topic: "Sin",    // used here not by chart.js
                label: "Sin",
                yAxisID: "1",
                fill: false,
                lineTension: 0,
                borderColor: "#0000ff",
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: "#0000ff",
                pointBackgroundColor: "#0000ff",
                backgroundColor:  "#0000ff",
                borderWidth: 1,
                data: []  // data is written here later
            }, {
                topic: "Triangle",    // used here not by chart.js
                label: "Triangle",
                yAxisID: "2",
                fill: false,
                lineTension: 0,
                borderColor: "#ff0000",
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: "#ff0000",
                pointBackgroundColor: "#ff0000",
                backgroundColor:  "#ff0000",
                borderWidth: 1,
                data: []  // data is written here later
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                    }
                ],
                yAxes: [{
                    id: "1",
                    ticks: {
                        min: -1,
                        max: 1,
                        stepSize: 0.2
                    }
                }, {
                    id: "2",
                    ticks: {
                        min: -10,
                        max: 10,
                        stepSize: 2
                    }
                }]
            },
            animation: {
                duration: 0
            }
        }
    }
        
/***** You shouldn't normally need to change anything below here *****/    
    var myChart = null;
    var loaded = false;     // indicates whether we have already had a load action
    var chartTimeSpan;
    var chartMaxPoints;

    function doChart(msg, scope) {
            var ctx = document.getElementById(chartID);
            myChart = new Chart(ctx, chartDef);     
        }
 

    (function(scope) {
        // this code gets run when the a view is opened on the node in the browser
        // send a preload message back to node red to ask it send
        // us a complete set of data. Pass down max points and time span to the helper node for it to use
        // plus an array of the topics of interest
        scope.send( preloadMsg() );
        
        scope.$watch('msg', function(msg) {
            if (msg) {
                doChart(msg, scope);
            }
        });
    })(scope);
})();
