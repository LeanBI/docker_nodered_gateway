(function() {
	var ctx = document.getElementById("myChartSimple1");
	var chartDef =  {
	    type: 'scatter',
	    data: {
	        datasets: [{
	            label: 'Scatter Dataset',
	            data: [{
	                x: -10,
	                y: 0
	            }, {
	                x: 0,
	                y: 10
	            }, {
	                x: 10,
	                y: 5
	            }]
	        }]
	    options: {
	        scales: {
	            xAxes: [{
	                type: 'linear',
	                position: 'bottom'
	            }]
	        }
	    }
		

   function doChart(msg, scope) {
	   var ctx = document.getElementById(chartID);
       myChart = new Chart(ctx, chartDef);
   }


  function(scope) {
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
    })(scope)
