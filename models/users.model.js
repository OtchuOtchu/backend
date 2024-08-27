const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserData(uid) {
  const getUser = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
  return getUser;
}

async function updateUserData({
  uid,
  name,
  email,
  height,
  weight,
  style,
  sex,
}) {
  const updateUser = await prisma.user.update({
    where: {
      uid: uid,
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