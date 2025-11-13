const { v4 } = require("uuid");

const data = [
  {
    id: v4(),
    author: "전상원",
    content: "아주 좋아",
    createdAt: new Date().toISOString(),
  },
];

const feedId = data.filter((v) => v.id);
const comment = [
  {
    id: v4(),
    feedId: feedId,
    author: "전상원",
    content: "ㄹㅇ ㅋㅋ",
    createdAt: new Date().toISOString(),
  },
];

module.exports = { data, comment };
