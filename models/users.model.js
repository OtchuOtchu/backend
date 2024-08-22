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

<<<<<<< Updated upstream
module.exports = { getUserData };
=======
async function getUpdateUserData({
  userId,
  name,
  email,
  height,
  weight,
  style,
  sex,
}) {
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
      height: height,
      weight: weight,
      style: style,
      sex: sex,
    },
  });
  return updateUser;
}

module.exports = { getUserData, getUpdateUserData };
>>>>>>> Stashed changes
