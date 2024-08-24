// postLikeClothes(req, res): 옷 찜하기 처리
// getFavouriteClothes(req, res): 사용자의 찜한 옷 가져오기

const FavouritesModel = require("../models/favourites.model");

async function getFavouritesClothes(req, res) {
  try {
    const userId = Number(req.params.userId);
    const getFavourites = await FavouritesModel.getFavouriteData(userId);
    res.status(200).json({ favourites: getFavourites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getFavouritesClothes };
