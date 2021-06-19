const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER || "http://localhost:9000",
    options: {},
  },
  () => {
    console.log(">> Sonar analysis is done!");
  }
);
