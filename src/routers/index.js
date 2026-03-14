const express = require("express");
const accessRoute = require('./access/access.route')

const router = express.Router();

router.use("/v1/api", accessRoute);

module.exports = router;
