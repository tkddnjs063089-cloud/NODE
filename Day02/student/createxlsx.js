const exceljs = require("exceljs");

const workbook = new exceljs.Workbook();
const icecreamWorkBook = workbook.addWorksheet("아이스크림 리스트");
icecreamWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "학과", key: "major" },
  { header: "학과", key: "Secmajor" },
];
icecreamWorkBook.addRow({
  name: "손정우",
  major: "실용음악학과",
  Secmajor: "사회복지학과",
});
icecreamWorkBook.addRow({
  name: "이영철",
  major: "경영학과",
  Secmajor: "신학과",
});
icecreamWorkBook.addRow({
  name: "신여진",
  major: "국어국문학과",
  Secmajor: "심리학과",
});

workbook.xlsx.writeFile("students.xlsx");
