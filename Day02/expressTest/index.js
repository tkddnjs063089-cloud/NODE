const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// "/happy"
app.get("/happy", (req, res) => {
  res.send("Happy, Express!");
});

// "/ping"
app.get("/ping", (req, res) => {
  res.send("pong, Express!");
});

app.get("/arombake", (req, res) => {
  res.json({ name: "아롬베이크", type: "빵집", rate: 4.7 });
});

// app.get("/bake", (req, res) => {
//   const filePath = path.join(__dirname, "bake.txt");
//   const raw = fs.readFileSync(filePath, "utf-8");
//   const lines = raw.split("/n").filter(Boolean);
//   const result = lines.map((line) => {
//     const parts = line.split(",");
//     const namePart = parts[0];
//     const pricePart = parts[1];
//     const name = namePart.split(":")[1];
//     const price = Number(pricePart.split(":")[1]);

//     return { name, price };
//   });
//   res.json(result);
// });

const text = fs.readFileSync("bake.text", "utf-8");

const arr = [];
const obj = {};

text.split("/n").forEach((v) =>
  v.split(",").forEach((pair) => {
    const [key, value] = pair.split(":");
    arr.push({ [key]: value });
  })
);

console.log(arr);

app.listen(3000, () => {
  console.log("실행!");
});
