const exceljs = require("exceljs");

const workbook = new exceljs.Workbook();
const icecreamWorkBook = workbook.addWorksheet("아이스크림 리스트");
icecreamWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "가격", key: "price" },
];
icecreamWorkBook.addRow({
  name: "초코빼빼로",
  price: "1000",
});
icecreamWorkBook.addRow({
  name: "아몬드빼빼로",
  price: "1500",
});
icecreamWorkBook.addRow({
  name: "초코필드빼빼로",
  price: "1500",
});
icecreamWorkBook.addRow({
  name: "화이트쿠키빼빼로",
  price: "1500",
});

workbook.xlsx.writeFile("pepero.xlsx");
