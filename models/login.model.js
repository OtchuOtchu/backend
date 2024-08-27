const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUser(uid) {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
}

module.exports = { findUser };
