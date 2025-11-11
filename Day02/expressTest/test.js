const fs = require("fs");
const text = fs.readFileSync("bake.text", "utf-8");

const arr = [];

text.split("\n").forEach((v) => {
  const arr = [];
  const obj = {};

  text.split("/n").forEach((v) =>
    v.split(",").forEach((pair) => {
      const [key, value] = pair.split(":");
      arr.push({ [key]: value });
    })
  );

  console.log(arr);
});

console.log(arr);
