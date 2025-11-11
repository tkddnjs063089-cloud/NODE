// // https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
// const prompt = require("prompt-sync")();

// const ccxt = require("ccxt");
// let current = 0;
// const buyCoin = +prompt("얼마 구매하실건가요? (10~100만원)");
// const buyNow = prompt("구매 하시려면 엔터를 눌러주세요!");
// console.log(`${buyCoin}만원 구매하셧습니다!`);
// console.log(buyNow);

// const getCoin = async () => {
//   const exchange = new ccxt.binance();
//   const coin = await exchange.fetchTicker("BTC/USDT");
//   const loading = (coin.last - buyCoin) / buyCoin;
//   console.log(`현재 비트코인 가격: ${coin.last}`);
//   if (loading > 0) {
//     console.log(`${loading * 10000}% 떡상`);
//   } else {
//     console.log(`${loading * 10000}% 떡락`);
//   }
//   current = coin.last;
// };

// setInterval(() => {
//   getCoin();
// }, 3000);
const prompt = require("prompt-sync")();
const ccxt = require("ccxt");

const buyCoin = prompt("비트코인 살 때 '기준이 될 가격'을 가져올까요? (엔터)");
// 여긴 그냥 입력 대기용
console.log("기준 가격을 가져옵니다...");

const exchange = new ccxt.binance();
let buyPrice = 0; // 내가 샀다고 가정한 가격

// 1) 처음 한 번 현재가를 가져와서 '매수가'로 저장
const init = async () => {
  const first = await exchange.fetchTicker("BTC/USDT");
  buyPrice = first.last;
  console.log(`매수가(기준가): ${buyPrice}`);
};

const getCoin = async () => {
  const coin = await exchange.fetchTicker("BTC/USDT");
  const current = coin.last;
  console.log(`현재 비트코인 가격: ${current}`);

  // 매수가가 있어야 계산 가능
  if (buyPrice > 0) {
    const diffRate = ((current - buyPrice) / buyPrice) * 100; // 퍼센트
    if (diffRate >= 0) {
      console.log(`${diffRate.toFixed(2)}% 떡상 🚀`);
    } else {
      console.log(`${diffRate.toFixed(2)}% 떡락 😵`);
    }
  }
};

(async () => {
  await init(); // 매수가 저장
  setInterval(getCoin, 3000); // 3초마다 현재가 비교
})();
