const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/", usersController.getUser);
usersRouter.patch("/update", usersController.updateUser);

module.exports = usersRouter;
