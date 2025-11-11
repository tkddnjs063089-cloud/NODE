const express = require("express");
const app = express();
const xlsx = require("xlsx");
const path = require("path");

app.get("/students", (req, res) => {
  const filePath = path.join(__dirname, "students.xlsx");
  const workbook = xlsx.readFile(filePath);

  const firstSheet = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheet];

  const rows = xlsx.utils.sheet_to_json(sheet);

  const result = rows.map((row) => ({
    name: row["이름"],
    major: row["학과"],
    Secmajor: row["학과"],
  }));

  res.json(result);
});

app.listen(3000, () => {
  console.log("실행 완료!");
});
