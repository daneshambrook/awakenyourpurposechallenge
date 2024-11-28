!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).WheelOfLife =
        e());
})(this, function () {
  "use strict";
  return {
    setup: function (chartEl, sectionsEl, config) {
      const chartSeries = Array(config.length).fill(1); // Updated to start at 1
      const chartLabels = config.map((c) => c.name);
      const chartColors = config.map((c) => c.color);

      var options = {
        chart: {
          type: "polarArea",
          toolbar: {
            show: true,
          },
          animations: {
            animateGradually: {
              enabled: false,
            },
          },
        },
        series: chartSeries,
        labels: chartLabels,
        colors: chartColors,
        yaxis: {
          max: 10,
        },
        xaxis: {
          labels: {
            style: {
              colors: chartColors,
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (_, opt) => config[opt.seriesIndex].name,
        },
        legend: { show: false },
        plotOptions: {
          radar: {
            polygons: {
              connectorColors: chartColors,
              colors: chartColors,
            },
          },
        },
      };
      var chart = new ApexCharts(chartEl, options);
      chart.render();

      for (let i = 0; i < config.length; i++) {
        const c = config[i];

        const section = document.createElement("section");
        // Header
        const header = document.createElement("h1");
        header.textContent = c.name;
        section.appendChild(header);
        // Input
        const input = document.createElement("input");
        input.id = `input-${i}`;
        input.type = "range";
        input.min = "1";
        input.max = "10";
        input.step = "1";
        input.value = "1"; // Updated to start at 1
        input.oninput = (e) => {
          chartSeries[i] = e.target.value;
          chart.updateSeries(chartSeries, false);
        };
        section.append(input);
        // Description
        const description = document.createElement("p");
        description.innerText = c.description;
        section.appendChild(description);

        // Add section
        sectionsEl.appendChild(section);
      }
    },
  };
});
