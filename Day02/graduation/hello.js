while (true) {
  const prompt = require("prompt-sync")();
  const today = new Date();
  const dday = new Date("2026-01-27");
  const minus = dday - today;
  const diffday = minus / (1000 * 60 * 60 * 24);
  console.log(Math.floor(diffday));
  const exit = prompt("종료하시겠습니까? y/n");
  if (exit === "n") {
    break;
  }
}
