const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/:userId", usersController.getUser);
usersRouter.patch("/update/:userId", usersController.updateUser);

module.exports = usersRouter;
