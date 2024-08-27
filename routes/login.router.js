const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/favourites.controller");

loginRouter.get("/", loginController);

module.exports = loginRouter;
