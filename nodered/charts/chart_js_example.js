<!-- See the read me comment node. Colin Law's original notes follow -->

<!--
A node-red Dashboard UI template to draw charts using chart.js
Before use download the file Chart.bundle.min.js from chartjs.org and 
save in an appropriate folder (e.g. .node-red/static). 
In settings.js set httpStatic to the full path of that folder and restart node-red.
Make sure that the options for 'Pass through messages' and 'Add output messages' 
in this node are cleared.
For basic use set the id and size you want in the canvas tag and set chartID to the id
Setup chartDef as required for your chart (see the chart.js docs)
In addition, for each dataset specify in chartDef the message topic that you will use for that channel.
To (optionally) provide the chart with a one-off set of data send the node a message with:
msg.action = "load"
msg.payload = [
{topic: "mytopic1", data: [{x: x1,y:y2},{x:x2,y:y2},...]},
{topic: "mytopic2", data: [{x: x1,y:y2},{x:x2,y:y2},...]},
...]
Where mytopic1 and mytopic2 are the the topics specified in the chartDef

To provide the chart with data incrementally (for a time series for example)
send it messages of the form
{topic: "mytopic1", payload: {x:xvalue,y:yvalue}}
The chart will be updated as each sample is provided.
To limit the growth of the chart set chartMaxPoints and/or chartTimeSpan in the Chart Helper node
as described at the head of that node.
If you find that chart seems to flicker and scroll bars come and go then try 
setting a size other than auto in the Size specification for this node.

For Bar charts the x value is the label for the bar and the y value is the bar value

Note that since the chart samples are stored in the browser then the chart will be cleared each
time the browser is refreshed (and will be clear on initially opening the view). In order to 
provided persistency over browser opening and refresh this node may be used in conjunction with
the Chart Helper function node.  Details for its use are in the source of that node.

If your flow includes more that one instance of this script then the line fetching 
Chart.bundle.min.js need only be included in one of them
-->

<script src="/Chart.bundle.min.js"></script>
<canvas id="myChartSimple1" width="300" height="300"></canvas>
<script>
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
        if (!myChart) {
            // chart does not exist so load the data and create it
            var ctx = document.getElementById(chartID);
            myChart = new Chart(ctx, chartDef);     
        }
        // chart already exists, update it
        var datasets = myChart.data.datasets;
        // is this a load or preload action?
        if (msg.action === "load" || msg.action === "preload") {
            // yes, do not allow preload if we have already had a load
            // so do it if this is a load or we have not previously had a load
            if (msg.action === "load" || !loaded) {
                // pick up chartTimeSpan and chartMaxPoints if they have been provided
                if (typeof msg.chartTimeSpan != 'undefined') {
                    chartTimeSpan = msg.chartTimeSpan;
                }
                if (typeof msg.chartMaxPoints != 'undefined') {
                    chartMaxPoints = msg.chartMaxPoints;
                }
                    
                // replace existing data for matching topics
                for (var j = 0; j < msg.payload.length; j++) {
                    var topic = msg.payload[j].topic;
                    // find it in the chart
                    for (var i = 0; i < datasets.length; i++) {
                        if (datasets[i].topic == topic) {
                            // if stripping old samples by time is required then ensure the x value is Date
                            if (chartTimeSpan > 0 ) {
                                var data = msg.payload[j].data;
                                for (var k = 0; k < data.length; k++) {
                                    if (typeof data[k].x === "string") {
                                        data[k].x = new Date(data[k].x);
                                    }
                                }
                            }
                            if (chartDef.type !== "bar") {
                                datasets[i].data = msg.payload[j].data;
                            } else {
                                // bar chart so x values must go to labels and y values to dataset
                                datasets[i].data = [];
                                myChart.data.labels = [];
                                var data = msg.payload[j].data;
                                for (var k = 0; k < data.length; k++) {
                                    datasets[i].data.push(data[k].y);
                                    myChart.data.labels.push(data[k].x);
                                }
                            }
                            break;
                        }
                    }
                }
            }
            if (msg.action === "load") loaded = true;
            myChart.update();
        } else {
            // does the topic match one of the datasets?
            for (var i = 0; i < datasets.length; i++) {
                if (datasets[i].topic == msg.topic) {
                    // if stripping old samples by time is required then ensure the x value is Date
                    if (chartTimeSpan > 0 && typeof msg.payload.x === "string") {
                        msg.payload.x = new Date(msg.payload.x);
                    }
                    if (chartDef.type !== "bar") {
                        datasets[i].data.push(msg.payload);
                    } else {
                         // bar chart so x value must go to labels and y value to dataset
                        datasets[i].data.push(msg.payload.y);
                        myChart.data.labels.push(msg.payload.x);
                    }
                    myChart.update();
                    break;
                }
            }
        }
        // strip off samples older than now
        // charTimeSpan == 0 implies don't do it
        var shifted = false;
        if (chartTimeSpan > 0) {
            var now = new Date();
            var oldestTimeAllowed = now - chartTimeSpan;
            for (var i = 0; i < datasets.length; i++) {
                dataset = datasets[i];
                while(dataset.data[0] && getTime(dataset.data[0].x) < oldestTimeAllowed) {
                    dataset.data.shift();
                    shifted = true;
                }
            }
        }
        // strip samples off the front if there are now too many
        // charTimeSpan == 0 implies don't do it
        if (chartMaxPoints > 0) {
            for (var i = 0; i < datasets.length; i++) {
                dataset = datasets[i];
                while(dataset.data.length > chartMaxPoints) {
                    dataset.data.shift();
                    shifted = true;
                }
            }
        }
        if (shifted) {
            myChart.update();
        }
    };

    // gets the time of an x value, works for strings or Date types
    function getTime(x) {
        if (typeof x === "string") x = new Date(x);
        return x.getTime();
    }
    
    // builds the preload message for sending back to the chart helper
    function preloadMsg() {
        var preMsg = {action: "preload", payload: "preload"};
        // build array of topics in chart
        var topics = [];
        for (var i=0; i<chartDef.data.datasets.length; i++) {
            topics.push(chartDef.data.datasets[i].topic);
        }
        preMsg.topics = topics;
        // has the chart already been created
        if (myChart) {
            preMsg.lastXValue = 1;
        } else {
            preMsg.lastXValue = 0;
        }
        return preMsg;
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
</script>
