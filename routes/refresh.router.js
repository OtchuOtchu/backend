const express = require("express");
const refreshRouter = express.Router();
const refreshController = require("../controllers/refresh.controller");

refreshRouter.get("/", refreshController.refresh);

module.exports = refreshRouter;
