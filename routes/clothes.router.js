const express = require("express");
const clothesRouter = express.Router();
const clothesController = require("../controllers/clothes.controller");

clothesRouter.get('/', clothesController.getRecommendedClothes); // 수정됨
clothesRouter.post('/add', clothesController.createClothes); // 수정됨


module.exports = clothesRouter;


