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

async function getStyleSetsData(userId) {
  const getStyleSets = await prisma.styleSets.findMany({
    where: {
      userId: userId,
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

module.exports = { getUserData, getStyleSetsData };
