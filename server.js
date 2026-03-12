require("dotenv").config();
const { app : appConfig } = require("./src/configs/common");

const app = require("./src/app");

const server = app.listen(appConfig.port, () => {
  console.log("server start thành công");
});

process.on("SIGINT", () => {
  server.close(() => console.log("exit server thành cônsg"));
});
