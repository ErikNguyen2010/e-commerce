const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { checkOverload } = require("./helper/checkConnection");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
checkOverload();

require("./dbs/init.mongodb");

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "his",
  });
});

module.exports = app;
