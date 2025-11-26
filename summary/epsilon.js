const express = require("express");
const app = express();

//미들웨어

const date = new Date().toISOString();

const test = (req, res, next) => {
  console.log(date);
  next();
};

app.use(test);

app.get("/", (req, res) => {
  res.json({ msg: "시작이욤" });
});

app.get("/dogs", (req, res) => {
  res.json({ msg: "멍멍이욤" });
});

app.listen(3000, () => {
  console.log("뒷반 시작 on");
});
