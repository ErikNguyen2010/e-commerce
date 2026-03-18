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

module.exports = app;
