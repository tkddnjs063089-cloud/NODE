const xlsx = require("xlsx");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>빼빼로 월드에 오신걸 환영합니다.</h1>");
});

app.get("/list", (req, res) => {
  const filePath = path.join(__dirname, "pepero.xlsx");
  const workbook = xlsx.readFile(filePath);

  const firstSheet = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheet];

  const rows = xlsx.utils.sheet_to_json(sheet);

  const result = rows.map((row) => ({
    name: row["이름"],
    price: row["가격"],
  }));
  res.json(result);
});

app.listen(3000, () => {
  console.log("빼빼로 월드에 오신걸 환영합니다!");
});
