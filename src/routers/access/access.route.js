const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { aynscHandler } = require("../../auth/checkAuth");
const route = express.Router();

route.post("/shop/login", aynscHandler(AccessController.login));
route.post("/shop/signup", aynscHandler(AccessController.signUp));

module.exports = route;
