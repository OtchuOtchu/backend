const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getStyleSetsData(uid) {
  const getStyleSets = await prisma.styleSets.findMany({
    where: {
      uid: uid,
    },
    select: {
      id: true,
      createdAt: true,
      weather: true,
      styleCapture: {
        select: {
          clothing: {
            select: {
              id: true,
              category: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const response = getStyleSets.map((styleSet) => ({
    styleSetId: styleSet.id,
    createdAt: styleSet.createdAt.toISOString().split("T")[0], // 날짜 부분만 추출
    weather: styleSet.weather, // weather 데이터를 그대로 사용
    clothes: styleSet.styleCapture.map((capture, index) => ({
      id: capture.clothing.id, // id가 없을 경우 인덱스를 사용
      category: capture.clothing.category,
      image: capture.clothing.image, // 이미지가 없으면 예시 URL 사용
    })),
  }));

  return response;
}

async function createStyleSetsData(uid, created, weather, clothes) {
  try {
    // 1. Create a new StyleSet record
    const newStyleSet = await prisma.styleSets.create({
      data: {
        uid: uid,
        createdAt: new Date(created),
        weather: weather,
      },
    });

    // 2. Create StyleCapture records for each clothing item
    const styleCaptureRecords = clothes.map(({ clothingId }) => ({
      styleSetId: newStyleSet.id,
      clothingId: clothingId,
    }));

    await prisma.styleCapture.createMany({
      data: styleCaptureRecords,
    });

    return newStyleSet;
  } catch (error) {
    console.error("Failed to create style set:", error);
    throw new Error("Failed to create style set");
  }
}

module.exports = { getStyleSetsData, createStyleSetsData };
