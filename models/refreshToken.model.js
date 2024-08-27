const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postRefreshToken({ uid, refreshToken }) {
  const createRefreshToken = await prisma.refreshToken.create({
    data: {
      userId: uid,
      refreshToken: refreshToken,
    },
  });
  return createRefreshToken;
}
async function getRefreshToken(uid) {
  const getRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      userId: uid,
    },
  });
  return getRefreshToken;
}

module.exports = { postRefreshToken, getRefreshToken };
