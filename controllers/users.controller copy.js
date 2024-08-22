//postUser(req, res): 회원가입 처리
//getUser(req, res): 사용자 정보 가져오기
//updateUser(req, res): 사용자 정보 수정

const user = require("../models/users.model");

async function getUser(req, res) {
  try {
    const userData = await user.getUserData();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUser };
