//postUser(req, res): 회원가입 처리
//getUser(req, res): 사용자 정보 가져오기
//updateUser(req, res): 사용자 정보 수정

const userModel = require("../models/users.model");

async function getUser(req, res) {
  try {
    // JWT 미들웨어에서 추출한 uid 사용
    const uid = req.uid;

    const userData = await userModel.getUserData(uid);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    // JWT 미들웨어에서 추출한 uid 사용
    const uid = req.uid;
    const userData = req.body;

    const updatedUser = await userModel.updateUserData({
      uid: uid,
      name: userData.name,
      email: userData.email,
      height: userData.height,
      weight: userData.weight,
      style: userData.style,
      sex: userData.sex,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user information" });
  }
}

module.exports = { getUser, updateUser };