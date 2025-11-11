const express = require("express");
const app = express();
const { icecream } = require("./data");

// JSON 본문 파싱 가능하게 해줌
app.use(express.json());
// HTML form에서 전송된 데이터를 서버에서 읽을 수 있도록 옵션 설정 true
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("베라베라 맛있는 베라 어서오고");
});

app.get("/menu", (req, res) => {
  const { underkcal, flavor } = req.query;

  if (underkcal) {
    const result = icecream.filter((v) => v.kcal <= +underkcal);
    res.json(result);
  }
  if (flavor) {
    const result = icecream.filter((v) => v.flavor.includes(flavor));
    res.json(result);
  }

  res.json(icecream);
});

app.get("/menu/:num", (req, res) => {
  const { num } = req.query;
  if (+num < 0 || 3 < +num) {
    res.json("그런 아이스크림은 없습니다");
  } else {
    res.json(icecream[+num]);
  }
});

app.post("/add", (req, res) => {
  const { name, kcal, flavor1, flavor2 } = req.body;
  icecream.push({ name, kcal, flavor1, flavor2 });
  res.json(`${name}아이스크림이 추가 됐습니다!`);
});

app.listen(3000, () => {
  console.log("아이스크림 먹으러 가즈아");
});
