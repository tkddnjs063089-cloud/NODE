const cors = require("cors");
const express = require("express");
const app = express();
const { data, comment } = require("./data");
const { v4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("트위터 페이지 입니다");
});

app.get("/feeds", (req, res) => {
  res.json(data);
});

app.post("/feeds", (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    res.json("데이터가 유효하지 않습니다");
    return;
  }
  data.push({
    id: v4(),
    author,
    content,
    createdAt: new Date().toLocaleString(),
  });
  res.json(`${content}피드가 추가되었습니다`);
});

app.get("/feeds/:feedId", (req, res) => {
  const { feedId } = req.query;
  const targetIndex = data.findIndex((v) => v.id == feedId);
  if (targetIndex == -1) {
    res.status(404).json(`${id} 피드는 존재하지 않습니다`);
    return;
  }
  res.json(targetIndex);
});

app.put("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = data.findIndex((v) => v.id == feedId);
  if (targetIndex == -1) {
    res.status(404).json(`${id} 피드는 존재하지 않습니다`);
    return;
  }
  const { author, content, createdAt } = req.body;
  data[targetIndex].author = author || data[targetIndex].author;
  data[targetIndex].content = content || data[targetIndex].content;
  data[targetIndex].createdAt = createdAt || data[targetIndex].createdAt;
  res.json(`${author}피드가 수정 되었습니다`);
});

app.delete("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = data.findIndex((v) => v.id == feedId);
  if (targetIndex == -1) {
    res.status(404).json(`${feedId}피드가 존재하지 않습니다`);
    return;
  }
  data.splice(targetIndex);
  res.json(`${feedId}피드가 삭제되었습니다`);
});

app.post("/feeds/:feedid/comments", (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    res.json("데이터가 유효하지 않습니다");
    return;
  }
  comment.push({
    id: v4(),
    feedId,
    author,
    content,
    createdAt: new Date().toLocaleString(),
  });
  res.json(`${author}님의 댓글이 작성되었습니다`);
});

app.get("/feeds/:feedid/comments", (req, res) => {
  const { feedid } = req.params;
  const targetIndex = data.findIndex((v) => v.id == feedid);
  if (targetIndex == -1) {
    res.status(404).json(`${feedid}댓글이 존재하지 않습니다`);
    return;
  }

  res.json(comment);
});

app.put("/comments/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = comment.findIndex((v) => v.feedId == feedId);
  if (targetIndex == -1) {
    res.status(404).json(`${feedId} 댓글은 존재하지 않습니다`);
    return;
  }
  const { author, content, createdAt } = req.body;
  comment[targetIndex].author = author || comment[targetIndex].author;
  comment[targetIndex].content = content || comment[targetIndex].content;
  comment[targetIndex].createdAt = createdAt || comment[targetIndex].createdAt;
  res.json(`${feedId}댓글이 수정 되었습니다`);
});

app.delete("/comments/:feedId", (req, res) => {
  const { feedId } = req.params;
  const targetIndex = comment.findIndex((v) => v.feedId == feedId);
  if (targetIndex == -1) {
    res.status(404).json(`${feedId}댓글이 존재하지 않습니다`);
    return;
  }
  comment.splice(targetIndex);
  res.json(`${feedId}댓글이 삭제되었습니다`);
});

app.post("/feeds/:feedid/comments", (req, res) => {
  const { author, content, feedId } = req.body;
  if (!author || !content || !feedId) {
    res.json("데이터가 유효하지 않습니다");
    return;
  }
  comment.push({ id: v4(), author, content, feedId });
  res.json(`${author}님의 댓글이 작성되었습니다`);
});

app.listen(3000, () => {
  console.log("twitter Booting");
});
