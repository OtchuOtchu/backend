const { verify } = require("./util/jwt-util");

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verify(token);
    if (result.ok) {
      req.uid = result.uid;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message, //만료되었을 때
      });
    }
  }
};

module.exports = { authJWT };
