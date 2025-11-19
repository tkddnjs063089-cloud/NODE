// {
//   id: string(UUID),
//   title: string,
//   description: string,
//   status: "pending" | "in-progress" | "done",
//   dueDate: new Date().toLocaleDateString(),
//   createdAt: string,
//   updatedAt: string,
// };
// Subtask {
//   id: string(UUID)
//   todoId: string(UUID)
//   title: string
//   status: "pending" | "in-progress" | "done"
//   createdAt: string
//   updatedAt: string
// }

const { v4 } = require("uuid");

const today = new Date();

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");

const data = [
  {
    id: v4(),
    title: "코딩",
    description: "코리아IT아카데미 학원에서 코딩공부",
    status: "pending",
    dueDate: `${year}-${month}-${day}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Subtask = [
  {
    id: v4(),
    todoId: data[0].id,
    title: "지피티 따까리 시키지",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

module.exports = { data, Subtask };
