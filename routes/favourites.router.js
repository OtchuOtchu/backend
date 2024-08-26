const express = require("express");
const favouritesRouter = express.Router();
const favouritesController = require("../controllers/favourites.controller");

favouritesRouter.get("/get/:userId", favouritesController.getFavouritesClothes);
favouritesRouter.post("/", favouritesController.postFavouritesClothes);

module.exports = favouritesRouter;
