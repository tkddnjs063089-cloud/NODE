const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/students", async (req, res) => {
  const result = await prisma.students.findMany();
  res.json(result);
});

app.post("/students", async (req, res) => {
  const { name, id, password, email } = req.body;
  const newPW = await bcrypt.hash(password, 10);

  await prisma.students.create({
    data: { name, id, password: newPW, email },
  });

  res.json({ msg: `${id}계정이 생성되었습니다.` });
});

app.post("/student", async (req, res) => {
  const { id, password } = req.body;
  const { password: pw } = prisma.students.findUnique({
    where: {
      id,
    },
  });
  const result = await bcrypt.compare(password, pw);

  if (!result) {
    res.json({ msg: "아이디 또는 비밀번호가 일치하지 않습니다." });
    return;
  }

  const uuid = crypto.randomUUID();
  const start = new Date();
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  await prisma.session.create({
    data: {
      id: uuid,
      start: start.toTimeString().split(" ")[0],
      end: end.toTimeString().split(" ")[0],
    },
  });

  res.cookie("sessionID", uuid, {
    httpOnly: true, // 브라우저에서 접근 못하게함
    maxAge: 1000 * 60 * 1,
    secure: false, //http 허용
  });
  res.json({ msg: "로그인 완료" });
});

app.listen(3000, () => {
  console.log("ㄱㄱ");
});
