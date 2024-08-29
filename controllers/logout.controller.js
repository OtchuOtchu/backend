const firebase = require("../utils/firebase");
const refreshTokenModel = require("../models/refreshToken.model");

async function logout(req, res) {
  const idToken = req.headers.authorization.split("Bearer ")[1];
  const uid = await firebase.verifyIdToken(idToken);
  const refreshToken = await refreshTokenModel.getRefreshToken(uid);

  if (!refreshToken) {
    return res.status(400).json({ message: "Token is required" });
  }
  
  try {
    await refreshTokenModel.deleteRefreshToken(refreshToken);
    
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    if (error.code === 'P2025') {  // Prisma에서 존재하지 않는 레코드를 삭제하려고 할 때 발생하는 에러 코드
      return res.status(404).json({ message: "Token not found" });
    } else {
      console.error("Error during logout:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = { logout };
