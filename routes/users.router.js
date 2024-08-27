const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");
const { authJWT } = require("../middlewares/authJWT");

usersRouter.get("/user", authJWT, usersController.getUser);
usersRouter.patch("/user", authJWT, usersController.updateUser);

module.exports = usersRouter;