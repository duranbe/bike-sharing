function getMemberData(canvasName){
    axios
      .get("/members", {
        
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
        console.log(data);
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
        console.log(data);
        document.getElementById(
          "test"
        ).innerHTML = `<canvas id="myChart" width="600" height="300"></canvas>`;
        createLineChart(canvasName, data);
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
      .get("/hour", {
        
      })
      .then(function (response) {
        var data = {
          labels: [],
          values: [],
        };
        response["data"].forEach((element) => {
          data["labels"].push(element["_id"]);
          data["values"].push(element["avg"]);
        });
        console.log(data);
        document.getElementById(
          "test2"
        ).innerHTML = `<canvas id="myChart2" width="600" height="300"></canvas>`;
        createLineChart(canvasName, data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }