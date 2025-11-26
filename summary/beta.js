const express = require("express");
const app = express();
const { data } = require("./data");

const students = [
  { name: "이영철", age: 25, gender: "male" },
  { name: "신여진", age: 26, gender: "female" },
  { name: "손정우", age: 25, gender: "male" },
  { name: "박신율", age: 31, gender: "male" },
];

const courses = [
  { name: "리눅스", timetable: ["sat", "sun"], teacher: "손흥민" },
  { name: "파이썬", timetable: ["mon", "wed", "fri"], teacher: "김민재" },
  { name: "자바", timetable: ["tue", "tus", "fri"], teacher: "황희찬" },
];

//Query
// /students?gender=femail
// 1. 쿼리 존재 여부
// 2. 유효성 검사
// 3. 쿼리조건에 맞도록 돌려줌

app.get("/students", (req, res) => {
  const { gender, age } = req.query;

  if (age && isNaN(+age)) {
    return res.json({ msg: "age값이 올바르지 않습니다." });
  }
  if (gender && ["male", "female"].includes(gender)) {
    return res.json({ msg: "age값이 올바르지 않습니다." });
  }

  let result = [...students];

  if (age) {
    result = result.filter((v) => v.age == +age);
  }
  if (gender) {
    result = result.filter((v) => v.gender == gender);
  }
});

app.get("/courses", (req, res) => {
  const { name, timetable, teacher } = req.query;

  if (name && !["리눅스", "파이썬", "자바"].includes(name)) {
    res.json({ msg: `${name}이라는 수업은 없습니다.` });
    return;
  }
  if (
    timetable &&
    !["sun", "mon", "tue", "wed", "tus", "fri", "sat"].includes(timetable)
  ) {
    res.json({ msg: `${timetable}요일엔 수업을 하지 않습니다.` });
    return;
  }
  if (teacher && !["손흥민", "김민재", "황희찬"].includes(teacher)) {
    res.json({ msg: `${teacher}선생님은 없습니다.` });
    return;
  }

  let result = [...courses];

  if (name) {
    result.filter((v) => v.name == name);
  }
  if (timetable) {
    result.filter((v) => v.timetable == timetable);
  }
  if (teacher) {
    result.filter((v) => {
      v.teacher == teacher;
    });
  }
  res.json(result);
});

app.get("/students", (req, res) => {
  res.json(students);
});

//params[매개변수]

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  res.json(students[id] || "그런 학생은 없습니다.");
});

app.get("/humans", (req, res) => {
  const { language, company, departure } = req.query;

  if (language && !data.some((v) => v.language == language))
    return res.json(result);
  if (company && !data.some((v) => v.Company == company))
    return res.json(result);
  if (departure && !data.some((v) => v.departure == departure))
    return res.json(result);

  let result = [...data];

  if (language) {
    result = result.filter((v) => v.language == language);
  }
  if (company) {
    result = result.filter((v) => v.Company == company);
  }
  if (departure) {
    result = result.filter((v) => {
      v.departure == departure;
    });
  }
});

app.get("/languages", (req, res) => {
  const languages = [...new Set(data.map((v) => v.language))].sort();
  res.json(languages);
});

app.listen(3000, () => {
  console.log("서버 시작!");
});
