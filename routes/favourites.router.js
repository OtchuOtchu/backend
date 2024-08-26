const express = require("express");
const favouritesRouter = express.Router();
const favouritesController = require("../controllers/favourites.controller")

favouritesRouter.get('/like', favouritesController.postLikeClothes);
favouritesRouter.post('/', favouritesController.getFavouriteClothes);

module.exports = favouritesRouter;