const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getFavouriteData(userId) {
  const getFavourites = await prisma.favourites.findMany({
    where: {
      userId: userId,
    },
    select: {
      clothing: {
        select: {
          category: true,
          weather: true,
          image: true,
        },
      },
    },
  });

  const clothingArray = getFavourites.map((favourite) => favourite.clothing);

  const response = {
    clothes: clothingArray,
  };
  return response;
}

module.exports = { getFavouriteData };
