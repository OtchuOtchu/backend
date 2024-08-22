const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getFavouriteData(userId) {
  const getFavourite = await prisma.favourites.findUnique({
    where: {
      id: userId,
    },
    select: {
      category: true,
      weather: true,
    },
  });
  return getFavourite;
}
