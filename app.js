const express = require('express');
// bodyParser는 Express 4.16.0 이상에서는 필요 없음
const clothesRouter = require('./routes/clothes.router');
const usersRouter = require('./routes/users.router');

const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3000;

// PrismaClient 인스턴스 생성
const prisma = new PrismaClient();

// 미들웨어 설정
app.use(express.json()); // JSON 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 바디 파싱

// 라우터 설정
app.use('/api/clothes', clothesRouter);
app.use('/api/users', usersRouter); // usersRouter도 설정해줍니다.

// 기본 라우트 설정 (선택적)
app.get('/', (req, res) => {
  res.send('Welcome to the Clothes API!');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// PrismaClient 종료 시 서버 종료
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('PrismaClient disconnected');
  process.exit(0);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
