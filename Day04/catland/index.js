const express = require("express");
const { cats } = require("./data");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("고양이 랜드 어서오고");
});

app.post("/cats", (req, res) => {
  const { id, name, age, color } = req.body;

  if (!id || !name || !age || !color)
    res.json(`보낸 데이터가 유효하지 않습니다`);
  else if (cats.some((v) => v.name == name))
    res.json(`${name}고양이가 이미 있습니다`);
  else {
    cats.push({ id, name, age, color });
    res.json(`${name}고양이가 추가되었습니다`);
  }
});

app.get("/cats", (req, res) => {
  const { color } = req.query;

  if (color) {
    const result = cats.filter((v) => v.color == color);
    if (result.length === 0) {
      return res.json(`${color} 색을 가진 고양이는 없습니다.`);
    }
    return res.json(result);
  }
  res.json(cats);
});

app.get("/cats/:id", (req, res) => {
  const { id } = req.query;
  const result = cats.find((v) => v.id == id);

  res.json(result || "404");
});

app.delete("/cats", (req, res) => {
  const { id } = req.body;

  const targetIndex = cats.findIndex((v) => v.id == +id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 고양이 없습니다.` });
    return;
  }
  cats.splice(targetIndex);

  console.log(targetIndex);

  res.json(id);
});

app.put("/cats/:id", (req, res) => {
  const { id } = req.query;

  const targetIndex = cats.findIndex((v) => v.id == id);
  if (targetIndex) {
    res.status(404).json({ msg: `${id} 고양이 없습니다` });
    return;
  }

  const { name, age, color } = req.body;
  cats[targetIndex].name = name || cats[targetIndex].name;
  cats[targetIndex].age = age || cats[targetIndex].age;
  cats[targetIndex].color = color || cats[targetIndex].color;
});

app.listen(3000, () => {
  console.log("고양이 세계로 출발~");
});
