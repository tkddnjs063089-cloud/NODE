const { ramens, reviews } = require("./data");
const express = require("express");
const app = express();
const { v4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("이랏샤이마세");
});

app.get("/ramens", (req, res) => {
  const { spicyLevel } = req.query;
  if (spicyLevel < 0 || 5 < spicyLevel) {
    res.status(404).json("spicyLevel이 초과하거나 미달입니다");
    return;
  }
  res.json(ramens);
});

app.get("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const tagetIndex = ramens.find((v) => v.id == id);
  if (tagetIndex == -1) {
    res.status(404).json(`${id}번 라면이 없습니다`);
  }
  res.json(tagetIndex);
});

app.post("/ramens", (req, res) => {
  const { name, brand, soupType, spicyLevel } = req.body;
  if (!name || !brand || !soupType || !spicyLevel) {
    res.json("해당 데이터가 유효하지 않습니다");
    return;
  }
  ramens.push({ id: v4(), name, brand, soupType, spicyLevel });
  res.json(`${name}라면이 추가되었습니다`);
});

app.put("ramens/:id", (req, res) => {
  const { id } = req.body;
  const targetIndex = ramens.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.json(`${id}번 라면이 없습니다`);
    return;
  }
  const { name, brand, spicyLevel } = req.body;

  ramens[targetIndex].name = name || ramens[targetIndex].name;
  ramens[targetIndex].brand = brand || ramens[targetIndex].brand;
  ramens[targetIndex].spicyLevel = spicyLevel || ramens[targetIndex].spicyLevel;
  res.json(`${name}라면이 수정되었습니다`);
});

app.delete

app.listen(3000, () => {
  console.log("ramen open");
});
