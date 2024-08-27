const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const redisClient = require("./redis");
const secret = process.env.SECRET;

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
  /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
       promisify를 이용하여 promise를 반환하게 해줍니다.*/
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(uid); // refresh token 가져오기
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
