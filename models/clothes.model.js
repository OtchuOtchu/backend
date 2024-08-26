const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRecommendedClothes(weather, minTemp, maxTemp) {
  // Ensure minTemp and maxTemp are valid numbers
  const minTemperature = parseFloat(minTemp);
  const maxTemperature = parseFloat(maxTemp);

  if (isNaN(minTemperature) || isNaN(maxTemperature)) {
    throw new Error('Invalid temperature values provided.');
  }

  try {
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
  } catch (error) {
    console.error('Error in getRecommendedClothes model:', error); // 오류 로그 추가
    throw error; // 오류를 다시 던져서 컨트롤러에서 처리하도록 합니다.
  }
}

async function createClothes(clothesData) {
  const { name, category, weather, minTemperature, maxTemperature, image } = clothesData;
  const newClothes = await prisma.clothes.create({
    data: {
      name,
      category,
      weather,
      minTemperature: parseFloat(minTemperature), // Ensure minTemperature is a float
      maxTemperature: parseFloat(maxTemperature), // Ensure maxTemperature is a float
      image: image
    }
  });


  return newClothes;
}

module.exports = { getRecommendedClothes, createClothes };
