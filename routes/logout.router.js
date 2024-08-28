const express = require("express");
const logoutRouter = express.Router();
const logoutController = require("../controllers/logout.controller");

logoutRouter.delete("/", logoutController.logout);

module.exports = logoutRouter;
