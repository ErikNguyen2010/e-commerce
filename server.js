const app = require("./src/app");

const server = app.listen(3055, () => {
  console.log("server start thành công");
});

process.on("SIGINT", () => {
  server.close(() => console.log("exit server thành cônsg"));
});
