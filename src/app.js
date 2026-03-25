const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const route = require('./routers')

const { checkOverload } = require("./helper/checkConnection");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// checkOverload();

require("./dbs/init.mongodb");


app.use("/", route);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
