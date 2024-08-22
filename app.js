const express = require("express");
const { Prisma, PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = 4000;

const usersRouter = require("./routes/users.router");
const clothesRouter = require("./routes/clothes.router");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", usersRouter);
app.use("/api/clothes", clothesRouter);
app.use("/api/favourites", favouritesRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});