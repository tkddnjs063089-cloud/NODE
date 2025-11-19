const formatTime = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};

const responseFormater = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    const time = formatTime();
    const status = res.statusCode || 200;
    const isSuccess = status < 400;

    let payload;

    if (isSuccess) {
      // ✅ 성공 응답
      if (typeof body === "string") {
        // 문자열만 보낸 경우 → message로 사용
        payload = {
          success: true,
          message: body,
          time,
        };
      } else {
        // 객체/배열 보낸 경우 → data에 담고, body.message가 있으면 그대로 사용
        payload = {
          success: true,
          message: "성공",
          data: body,
          time,
        };

        if (body && typeof body.message === "string") {
          payload.message = body.message;
        }
      }
    } else {
      // ❌ 실패 응답
      if (typeof body === "string") {
        payload = {
          success: false,
          message: body,
          time,
        };
      } else {
        payload = {
          success: false,
          ...body,
          time,
        };
        if (!payload.message) {
          payload.message = "요청 처리 중 오류가 발생했습니다.";
        }
      }
    }

    return originalJson(payload);
  };

  next();
};

module.exports = { responseFormater };
