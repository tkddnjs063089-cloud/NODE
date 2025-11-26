const express = require("express");
const app = express();

//웹 브라우저(주인님)
// Request <-> Response [HTTPS 방식]
//웹 서버는 CRUD[생성(post), 조회(get), 수정(put), 삭제(delete)]

app.get("/caffeins", (req, res) => {
  res.json(["아메리카노", "라떼", "카페모카"]);
});

app.get("/breads", (req, res) => {
  res.json(["식빵", "죽빵", "옥지야", "빵빵아"]);
});

app.listen(3000, () => {
  console.log("서버 시작!");
});
