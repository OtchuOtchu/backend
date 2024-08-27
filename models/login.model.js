const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function findUser(uid) {
  const findUserData = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });

  return findUserData ? true : false;
}
module.exports = { findUser };
