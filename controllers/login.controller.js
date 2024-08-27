const jwt = require("../utils/jwt-util");
// const redisClient = require("../utils/redis");
const firebase = require("../utils/firebase");
const loginModel = require("../utils/login.model");

async function login(req, res) {
  const idToken = req.headers.authorization.split("")[1];
  const uid = await firebase.verifyIdToken(idToken); // idToken 검증
  if (!uid) {
    return res.status(401).send({ ok: false, message: "invalid idToken" });
  } else {
    const findUser = loginModel.findUser(uid);

    if (findUser) {
      const accessToken = jwt.sign(uid);
      const refreshToken = jwt.refresh();

      // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장합니다.


      res.status(200).send({
        ok: true,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } else {
      res.send({ ok: false, message: "need signIn" });
    }
  }
}

module.exports = { login };
