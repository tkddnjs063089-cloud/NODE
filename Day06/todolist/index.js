const express = require("express");
const app = express();
const joi = require("joi");
const { v4 } = require("uuid");
const morgan = require("morgan");
const cors = require("cors");

const { data, Subtask } = require("./data");
const { responseFormater } = require("./func");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(responseFormater);
app.use(cors());

const dataschema = joi.object({
  title: joi.string(),
  description: joi.string(),
  status: joi.string().valid("pending", "in-progress", "done"),
  dueDate: joi.string(),
  updatedAt: joi.string(),
});

const Subtaskschema = joi.object({
  id: joi.string(),
  todoId: joi.string(),
  title: joi.string(),
  status: joi.string().valid("pending", "in-progress", "done"),
  createdAt: joi.string(),
  updatedAt: joi.string(),
});

const today = new Date();

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");

const validateTodo = (req, res, next) => {
  const { error } = dataschema.validate(req.body);
  if (error) {
    // responseFormater를 타야 하니까 json으로 보내기
    return res.status(400).json("데이터가 유효하지 않습니다");
  }
  next();
};

const validateSubtask = (req, res, next) => {
  const { error } = Subtaskschema.validate(req.body);
  if (error) {
    return res.status(400).json("데이터가 유효하지 않습니다");
  }
  next();
};

const loging = (req, res, next) => {
  const now = new Date().toISOString(); // 시간
  const method = req.method; // GET, POST, PUT, DELETE ...
  const path = req.originalUrl; // /todos/123 같은 전체 경로

  console.log(`[${method}] ${path} - ${now}`);

  next(); // 다음 미들웨어/라우터로 넘어가기
};

app.use(loging);

app.get("/", (req, res) => {
  res.json("투두리스트 어서오고");
});

app.post("/todos", validateTodo, (req, res) => {
  const { title, description, status } = req.body;
  if ((!title, !description, !status)) {
    res.json("데이터가 유효하지 않습니다");
  }
  data.push({
    id: v4(),
    title,
    description,
    status,
    duedate: `${year}-${month}-${day}`,
    createdAt: new Date().toISOString(),
  });
  res.json(`${title}리스트가 추가되었습니다`);
});

app.get("/todos", (req, res) => {
  res.json(data);
});

app.get("/todos/:todoid", (req, res) => {
  const { todoid } = req.params;
  const targetIndex = data.findIndex((v) => v.id == todoid);
  if (targetIndex == -1) {
    res.json(`${id}번 리스트가 존재하지 않습니다.`);
    return;
  }
  res.json(targetIndex);
});

app.put("/todos/:todoid", validateTodo, (req, res) => {
  const { todoid } = req.params;
  const targetIndex = data.findIndex((v) => v.id == todoid);
  if (targetIndex == -1) {
    res.json(`${id}번 리스트가 존재하지 않습니다.`);
    return;
  }
  const { title, description, status } = req.body;
  data[targetIndex].title = title || data[targetIndex].title;
  data[targetIndex].description = description || data[targetIndex].description;
  data[targetIndex].status = status || data[targetIndex].status;
  data[targetIndex].updatedAt = new Date().toISOString();
  res.json(`${todoid}번 리스트가 수정되었습니다.`);
});

app.delete("/todos/:todoid", (req, res) => {
  const { todoid } = req.params;
  const targetIndex = data.findIndex((v) => v.id == todoid);
  if (targetIndex == -1) {
    res.status(404).json(`${todoid}번 리스트가 존재하지 않습니다.`);
    return;
  }
  data.splice(targetIndex);
  res.json(`${todoid}댓글이 삭제되었습니다`);
});

app.post("/todos/:todoId/subtasks", validateSubtask, (req, res) => {
  const { todoId } = req.params;
  const { title, status } = req.body;
  if ((!title, !status)) {
    res.json("데이터가 유효하지 않습니다");
  }
  Subtask.push({
    id: v4(),
    todoId,
    title,
    status,
    createdAt: new Date().toISOString(),
  });
  res.json(`${title}리스트가 추가되었습니다`);
});

app.get("/todos/:todoId/subtasks", (req, res) => {
  res.json(Subtask);
});

app.get("/subtasks/:subtaskId", (req, res) => {
  const { subtaskId } = req.params;
  const targetIndex = Subtask.findIndex((v) => v.id == subtaskId);
  if (targetIndex == -1) {
    res.json(`${id}번 리스트가 존재하지 않습니다.`);
    return;
  }
  res.json(targetIndex);
});

app.put("/subtasks/:subtaskId", validateSubtask, (req, res) => {
  const { subtaskId } = req.params;
  const targetIndex = Subtask.findIndex((v) => v.id == subtaskId);
  if (targetIndex == -1) {
    res.json(`${subtaskId}번 리스트가 존재하지 않습니다.`);
    return;
  }
  const { title, status } = req.body;
  Subtask[targetIndex].title = title || Subtask[targetIndex].title;
  Subtask[targetIndex].status = status || Subtask[targetIndex].status;
  Subtask[targetIndex].updatedAt = new Date().toISOString();
  res.json(`${subtaskId}번 리스트가 수정되었습니다.`);
});

app.delete("/subtasks/:subtaskId", (req, res) => {
  const { subtaskId } = req.params;
  const targetIndex = Subtask.findIndex((v) => v.id == subtaskId);
  if (targetIndex == -1) {
    res.status(404).json(`${subtaskId}번 리스트가 존재하지 않습니다.`);
    return;
  }
  Subtask.splice(targetIndex);
  res.json(`${subtaskId}댓글이 삭제되었습니다`);
});

app.listen(3001, () => {
  console.log("todolist unlock");
});
