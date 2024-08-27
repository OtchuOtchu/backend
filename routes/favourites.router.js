const express = require("express");
const favouritesRouter = express.Router();
const favouritesController = require("../controllers/favourites.controller");
const { authJWT } = require("../middlewares/authJWT");

favouritesRouter.get(
  "/get",
  authJWT,
  favouritesController.getFavouritesClothes
);
favouritesRouter.post(
  "/like",
  authJWT,
  favouritesController.postFavouritesClothes
);

module.exports = favouritesRouter;
