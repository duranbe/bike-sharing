function createLineChart(canva_name, data) {
    var ctx = document.getElementById(canva_name);
    var color = "#4E9F3D";
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data["labels"],
        datasets: [
          {
            label: "Number of Trips",
            data: data["values"],
            lineTension: 0.2,
            backgroundColor: HexToRGB(color, 0), //Area
            borderColor: color, //line
            borderWidth: 2.5,
            pointRadius: 0,
            pointBackgroundColor: "white", //Point
            pointBorderColor: color,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: color,
            pointHitRadius: 15,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: true,
            },
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function (val, index) {
                // Hide the label of every 2nd dataset
                return index % 2 === 0 ? this.getLabelForValue(val) : "";
              },
              maxTicksLimit: 10,
              maxRotation: 0,
              minRotation: 0,
              color: "black",
            },
          },

          y: {
            grid: {
              display: true,
            },
            ticks: {
              maxTicksLimit: 10,
              padding: 1,
            },
          },
        },

        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: "#6e707e",
          titleFontSize: 14,
          borderColor: "#dddfeb",
          borderWidth: 0.7,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 10,
        },
      },
    });
  }

  function createDoughnutChar(canva_name,data){
    var ctx = document.getElementById(canva_name);
    var myLineChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data["labels"],
        datasets: [
          {
            label: "Number of Trips",
            data: data["values"],
            backgroundColor: ["#90d890","#186048"],
          },
        ],
      },
      options: {},

    });
  }