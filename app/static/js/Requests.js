function getMemberData(canvasName) {
  axios
    .get("/members", {})
    .then(function (response) {
      var data = {
        labels: [],
        values: [],
      };
      response["data"].forEach((element) => {
        data["labels"].push(element["_id"]);
        data["values"].push(element["count"]);
      });

      document.getElementById(
        "test3"
      ).innerHTML = `<canvas id="myChart3" width="600" height="300"></canvas>`;
      createDoughnutChar(canvasName, data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function getTripsCount(inputStartDate, inputEndDate, canvasName) {
  axios
    .get("/trips", {
      params: {
        startDate: inputStartDate,
        endDate: inputEndDate,
      },
    })
    .then(function (response) {
      var data = {
        labels: [],
        values: [],
      };
      response["data"].forEach((element) => {
        data["labels"].push(element["_id"]);
        data["values"].push(element["count"]);
      });

      document.getElementById(
        "test"
      ).innerHTML = `<canvas id="myChart" width="600" height="300"></canvas>`;
      createLineChart(canvasName, data, "Number of trips","#4E9F3D",0.2);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function getTripsCountHour(canvasName) {
  axios
    .get("/hour", {})
    .then(function (response) {
      var data = {
        labels: [],
        values: [],
      };
      response["data"].forEach((element) => {
        data["labels"].push(element["_id"]);
        data["values"].push(element["avg"]);
      });
      document.getElementById(
        "test2"
      ).innerHTML = `<canvas id="myChart2" width="600" height="300"></canvas>`;
      createLineChart(canvasName, data, "Number of 🚲 rentals","#189078",0);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function getTripsMonth(canvasName) {
    axios
      .get("/month", {})
      .then(function (response) {
        var data = {
          labels: [],
          values: [],
        };
        response["data"].forEach((element) => {
          data["labels"].push(element["_id"]);
          data["values"].push(element["count"]);
        });
        document.getElementById(
          "test4"
        ).innerHTML = `<canvas id="${canvasName}" width="600" height="300"></canvas>`;
        createBarChart(canvasName, data, "Monthly Rentals","#d8f0c0");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  
  function getTripsYear(canvasName) {
    axios
      .get("/year", {})
      .then(function (response) {
        var data = {
          labels: [],
          values: [],
        };
        response["data"].forEach((element) => {
          data["labels"].push(element["_id"]);
          data["values"].push(element["count"]);
        });
        document.getElementById(
          "test5"
        ).innerHTML = `<canvas id="${canvasName}" width="600" height="300"></canvas>`;
        createBarChart(canvasName, data, "Yearly Rentals","#90d890");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }