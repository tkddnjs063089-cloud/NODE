const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/pizzas", async (req, res) => {
  const pizzas = await prisma.pizza.findMany();
  res.json(pizzas);
});

app.listen(3000, () => {
  console.log("약줘");
});
