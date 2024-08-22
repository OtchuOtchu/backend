const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/", usersController.getUser);

module.exports = usersRouter;
