const express = require("express");
const styleSetsRouter = express.Router();
const styleSetsController = require("../controllers/stylesets.controller");
const { authJWT } = require("../middlewares/authJWT");

styleSetsRouter.get("/get", authJWT, styleSetsController.getStyleSets);
styleSetsRouter.post("/post", authJWT, styleSetsController.postStyleSets);

module.exports = styleSetsRouter;
