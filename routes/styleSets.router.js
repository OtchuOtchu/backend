const express = require("express");
const styleSetsRouter = express.Router();
const styleSetsController = require("../controllers/stylesets.controller");

styleSetsRouter.get("/get/:userId", styleSetsController.getStyleSets);
styleSetsRouter.post("/post", styleSetsController.postStyleSets);

module.exports = styleSetsRouter;
