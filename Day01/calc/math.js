const prompt = require("prompt-sync")();

while (true) {
  try {
    const a = +prompt("첫번째 숫자 입력");
    const b = +prompt("두번째 숫자 입력");
    if (isNaN(a) || isNaN(b)) throw new Error("숫자 입력하셈 ㅡㅡ");

    const plus = a + b;
    const minus = a - b;
    const multyply = a * b;
    const divide = a / b;
    console.log(plus);
    console.log(minus);
    console.log(multyply);
    console.log(divide);
  } catch (e) {
    console.log(e.message);
  }

  const exit = prompt("종료 하시겠습니까? y/n");
  if (exit === "y") {
    break;
  }
}
