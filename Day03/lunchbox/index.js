const express = require("express");
const app = express();
const { students } = require("./data");

app.get("/", (req, res) => {
  res.send("도시락 파티 오신걸 환영합니다!");
});

//list 전체 도시락 리스트 돌려주기
//옵션 주기 (= 쿼리 스트링)
// /list?shots=2&flavor=choco

app.get("/list", (req, res) => {
  const { menu } = req.query;

  if (menu) {
    const filterd = students.filter((s) => s.menu.includes(menu));
    res.json(filterd || `${menu}를 가진 학생은 없습니다`);
  }
  res.json(students);
});

app.get("/list/:num", (req, res) => {
  const { num } = req.params;
  if (+num < 0 || 3 < +num) {
    res.json("그런 도시락은 없습니다");
  } else {
    res.json(students[+num]);
  }
});

app.listen(3000, () => {
  console.log("Lunch box is Booting!");
});
