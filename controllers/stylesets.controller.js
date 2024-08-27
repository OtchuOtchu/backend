// postStyleSet(req, res): 스타일 세트 생성 처리
// getStyleSets(req, res): 사용자의 스타일 세트 가져오기

const StyleSetsModel = require("../models/stylesets.model");

async function getStyleSets(req, res) {
  try {
    const userId = req.uid;
    const getStyleSets = await StyleSetsModel.getStyleSetsData(userId);
    res.status(200).json({ styleSets: getStyleSets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postStyleSets(req, res) {
  const userId = req.uid;
  const { weather, clothes } = req.body;
  try {
    const newStyleSet = await StyleSetsModel.createStyleSetsData(
      userId,
      weather,
      clothes
    );
    res.status(200).json({
      message: "Style set and style captures created successfully",
      styleSet: newStyleSet,
    });
  } catch (error) {
    res.status(200).json({ error: error.message }); // 여기에서 오타가 있습니다.
  }
}

module.exports = { getStyleSets, postStyleSets };
