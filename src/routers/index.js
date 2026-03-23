const express = require("express");
const accessRoute = require('./access/access.route');
const { checkApiKey, checkPermission } = require("../auth/checkAuth");

const router = express.Router();

router.use(checkApiKey)
router.use(checkPermission('0000'))

router.use("/v1/api", accessRoute);

module.exports = router;
