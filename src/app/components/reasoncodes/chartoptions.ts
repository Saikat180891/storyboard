export const charts = {
  pieChart: {
    chart: {
        type: 'pieChart',
        height: 200,
        width: 400,
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: false,
        duration: 500,
        donutRatio: 0.65,
        donut:true,
        legendPosition: 'right',
        // title: 'Hello',
        labelThreshold: 0.07,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 20,
            right: 10,
            bottom: 0,
            left: 20
          },
          width: 50,
          height: 200,
          rightAlign: true
        }
      }
    },

    barChart: {
      chart: {
        type: 'discreteBarChart',
        height: 220,
        width: 400,
        margin : {
            top: 20,
            right: 20,
            bottom: 50,
            left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.1f')(d);
        },
        duration: 500,
        // xAxis: {
        //     axisLabel: 'X Axis'
        // },
        yAxis: {
            axisLabel: 'Benefits',
            axisLabelDistance: -10
        }
      }
    }
} 
