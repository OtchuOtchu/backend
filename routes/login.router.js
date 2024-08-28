const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/login.controller");

loginRouter.post("/", loginController.login);
loginRouter.get("/test", loginController.test);

module.exports = loginRouter;
