const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserData() {
  const getUser = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });
  return getUser;
}



module.exports = { getUserData };
