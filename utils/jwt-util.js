const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshToken.model");

const secret = process.env.JWT_SECRET;

// access token 발급
function sign(uid) {
  return jwt.sign({ uid }, secret, {
    algorithm: "HS256", // 암호화 알고리즘
    expiresIn: "1h", // 유효기간
  });
}

// access token 검증
function verify(token) {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      id: decoded.uid,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
}

// refresh token 발급
function refresh() {
  return jwt.sign({}, secret, {
    // refresh token은 payload 없이 발급
    algorithm: "HS256",
    expiresIn: "14d",
  });
}

// refresh token 검증
async function refreshVerify(token, uid) {
  // refresh token 검증
  try {
    const data = await refreshTokenModel.getRefreshToken(uid); // refresh token 가져오기
    if (token === data) {
      try {
        jwt.verify(token, secret);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = {
  sign,
  verify,
  refresh,
  refreshVerify,
};
