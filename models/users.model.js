const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserData(id) {
  const getUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return getUser;
}

async function updateUserData({
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

module.exports = { getUserData, updateUserData };
