import * as d3 from "d3";

export const charts = {
  pieChart: {
    chart: {
      type: "pieChart",
      height: 200,
      width: 400,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      x(d) {
        return d.key;
      },
      y(d) {
        return d.y;
      },
      showLabels: false,
      duration: 500,
      donutRatio: 0.65,
      donut: true,
      legendPosition: "right",
      labelThreshold: 0.07,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 20,
          right: 10,
          bottom: 0,
          left: 20,
        },
        width: 50,
        height: 200,
        rightAlign: true,
      },
    },
  },

  barChart: {
    chart: {
      type: "discreteBarChart",
      height: 220,
      width: 400,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55,
      },
      x(d) {
        return d.label;
      },
      y(d) {
        return d.value;
      },
      showValues: true,
      valueFormat(d) {
        return d3.format(",.1f")(d);
      },
      duration: 500,
      yAxis: {
        axisLabel: "Benefits",
        axisLabelDistance: -10,
      },
    },
  },

  stackedAreaChart: {
    chart: {
      type: "stackedAreaChart",
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      },
      x(d) {
        return d[0];
      },
      y(d) {
        return d[1];
      },
      useVoronoi: false,
      clipEdge: true,
      duration: 100,
      useInteractiveGuideline: true,
      legend: {
        align: true,
      },
      xAxis: {
        showMaxMin: false,
        tickFormat(d) {
          return d3.time.format("%x")(new Date(d));
        },
      },
      yAxis: {
        tickFormat(d) {
          return d3.format(",.2f")(d);
        },
      },
      zoom: {
        enabled: true,
        scaleExtent: [1, 10],
        useFixedDomain: false,
        useNiceScale: false,
        horizontalOff: false,
        verticalOff: true,
        unzoomEventType: "dblclick.zoom",
      },
    },
  },
};
