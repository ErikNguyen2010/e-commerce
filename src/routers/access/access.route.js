const express = require("express");
const AccessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helper/asyncHandler");
const { handleAuthen } = require("../../auth/checkAuth");

const route = express.Router();

route.post("/shop/login", asyncHandler(AccessController.login));
route.post("/shop/signup", asyncHandler(AccessController.signUp));

//authentication
route.use(asyncHandler(handleAuthen));

route.post("/shop/logout", asyncHandler(AccessController.logout));
route.post("/shop/refresh-token", asyncHandler(AccessController.handleRefreshToken));

module.exports = route;
