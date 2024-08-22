const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRecommendedClothes(weather, minTemp, maxTemp) {
  // Ensure minTemp and maxTemp are valid numbers
  const minTemperature = parseFloat(minTemp);
  const maxTemperature = parseFloat(maxTemp);

  if (isNaN(minTemperature) || isNaN(maxTemperature)) {
    throw new Error('Invalid temperature values provided.');
  }

  const clothes = await prisma.clothes.findMany({
    where: {
      weather: weather,
      minTemperature: {
        lte: maxTemperature // Ensure maxTemperature is used correctly
      },
      maxTemperature: {
        gte: minTemperature // Ensure minTemperature is used correctly
      }
    },
    select: {
      id: true,
      name: true,
      category: true
    },
    orderBy: {
      category: 'asc'
    }
  });

  return clothes;
}

async function createClothes(clothesData) {
  const { user_id, category, weather, minTemperature, maxTemperature, image_url } = clothesData;
  const newClothes = await prisma.clothes.create({
    data: {
      user: { connect: { id: parseInt(user_id) } },
      category,
      weather,
      minTemperature: parseFloat(minTemperature), // Ensure minTemperature is a float
      maxTemperature: parseFloat(maxTemperature), // Ensure maxTemperature is a float
      image: image_url
    }
  });

  return newClothes;
}

module.exports = { getRecommendedClothes, createClothes };
