// postLikeClothes(req, res): 옷 찜하기 처리
// getFavouriteClothes(req, res): 사용자의 찜한 옷 가져오기

const FavouritesModel = require('../models/favourites.model');

async function postLikeClothes(req, res){
  try{
    const {} = req.body;
    console.log(req.body);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}


module.exports = { postLikeClothes, }