const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "noticeboard",
  connectionLimit: 10,
});

app.get("/test", async (req, res) => {
  res.json("ㅅㅂ");
});

app.get("/boards", async (req, res) => {
  const [data] = await pool.query("select * from boards");
  res.json(data);
});

app.post("/boards", async (req, res) => {
  const { author, title, contents } = req.body;
  const sql = `insert into boards (author, title, contents) values(?,?,?)`;
  const [result] = await pool.execute(sql, [author, title, contents]);
  res.json({ msg: `${result.insertId} 만들어짐!` });
});

app.listen(3000, () => {
  console.log("서버 켜짐 ㅅㄱ");
});
