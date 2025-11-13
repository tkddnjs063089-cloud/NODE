const express = require("express");
const morgan = require("morgan");
const joi = require("joi");
const { responseFormater } = require("./func");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { members } = require("./data");

// 메서드, URL, 상태코드, 응답시간
app.use(morgan("dev"));
app.use(responseFormater);

const nyah = (req, res, next) => {
  console.log("메롱😛");
  next();
};

app.get("/", nyah, (req, res) => {
  res.json({ msg: "서버 동작중!" });
});

app.get("/members", (req, res) => {
  res.success(members);
});

const schema = joi.object({
  name: joi.string(),
  age: joi.number().integer().min(19),
  position: joi.string().valid("vocal", "rapper", "dancer"),
});

const checkBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json("ㅗ");
  next();
};

app.post("/members", checkBody, (req, res) => {
  const { name, age, position } = req.body;
  members.push({ name, age, position });
  res.json("멤버가 추가 되었습니다");
});

app.put("/mambers", checkBody, (req, res) => {
  const { name, age, position } = req.params;
  const targetIndex = members.findIndex((v) => v.name == name);
  ramens[targetIndex].name = name || ramens[targetIndex].name;
  ramens[targetIndex].age = age || ramens[targetIndex].age;
  ramens[targetIndex].position = position || ramens[targetIndex].position;
  res.json({ msg: `멤버가 수정되었습니다.` });
});

app.listen(3000, () => {
  console.log("서버 on");
});
