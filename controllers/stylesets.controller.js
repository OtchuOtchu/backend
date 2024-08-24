// postStyleSet(req, res): 스타일 세트 생성 처리
// getStyleSets(req, res): 사용자의 스타일 세트 가져오기

const StyleSetsModel = require("../models/stylesets.model");

async function getStyleSets(req, res) {
  try {
    const userId = Number(req.params.userId);
    const getStyleSets = await StyleSetsModel.getStyleSetsData(userId);
    res.status(200).json({ styleSets: getStyleSets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getStyleSets };
