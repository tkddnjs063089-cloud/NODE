const prompt = require("prompt-sync")();
const fs = require("fs");

const contents = prompt("일기 쓰셈");
fs.writeFileSync(
  `diary_${new Date().toLocaleDateString().replaceAll(" ", "")}.txt`,
  contents,
  "utf-8"
);
