const express = require("express");
const { Prisma, PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = 4000;

const usersRouter = require("./routes/users.router");
const clothesRouter = require("./routes/clothes.router");
const favouritesRouter = require("./routes/favourites.router");
const styleSetsRouter = require("./routes/styleSets.router");
const loginRouter = require("./routes/login.router");
const refreshRouter = require("./routes/refresh.router");

const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트엔드가 실행되는 도메인
    methods: ["GET", "POST"], // 허용할 HTTP 메소드
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", usersRouter);
app.use("/api/clothes", clothesRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/styleSets", styleSetsRouter);
app.use("/api/login", loginRouter);
app.use("/api/refresh", refreshRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
