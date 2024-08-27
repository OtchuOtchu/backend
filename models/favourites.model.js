const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getFavouriteData(uid) {
  const getFavourites = await prisma.favourites.findMany({
    where: {
      uid: uid,
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

async function postFavouritesData(uid, clothingId) {
  try {
    const newFavourite = await prisma.favourites.create({
      data: {
        uid: Number(uid),
        clothingId: Number(clothingId),
      },
    });
    return newFavourite;
  } catch (error) {
    throw new Error("Failed to add to favourites: " + error.message);
  }
}

module.exports = { getFavouriteData, postFavouritesData };
