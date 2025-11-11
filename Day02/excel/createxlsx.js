const exceljs = require("exceljs");

const workbook = new exceljs.Workbook();
const icecreamWorkBook = workbook.addWorksheet("아이스크림 리스트");
icecreamWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "맛", key: "flavor" },
  { header: "칼로리", key: "kcal" },
];
icecreamWorkBook.addRow({
  name: "월드콘",
  flavor: "부드러운 초코",
  kcal: "300",
});
icecreamWorkBook.addRow({ name: "빠삐코", flavor: "뻑뻑한 초코", kcal: "200" });

workbook.xlsx.writeFile("icecream.xlsx");
