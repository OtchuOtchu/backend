const express = require("express");
const { Prisma, PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = 4000;

const usersRouter = require("./routes/users.router");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/users", usersRouter);
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
