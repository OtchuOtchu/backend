//getRecommendedClothes(req, res): 옷 추천 처리
//createClothes(req, res): 새로운 옷 추가 처리

const ClothesModel = require('../models/clothes.model');

async function getRecommendedClothes(req, res) {
  try {
    const { weather, minTemperature, maxTemperature } = req.body; // 수정된 필드명
    console.log(req.body);
    const clothes = await ClothesModel.getRecommendedClothes(weather, minTemperature, maxTemperature);
    console.log(clothes);
    res.status(200).json({ recommendations: clothes });
  } catch (error) {
    console.error('Error in getRecommendedClothes:', error); // 오류 로그 추가
    res.status(500).json({ error: error.message });
  }
}

async function createClothes(req, res) {
  try {
    const clothesData = req.body;
    const newClothes = await ClothesModel.createClothes(clothesData);
    res.status(201).json({ message: 'Clothes added successfully', clothes: newClothes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getRecommendedClothes, createClothes };
