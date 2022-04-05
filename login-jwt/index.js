import express from "express";
// jwt 라이브러리
import jwt from "jsonwebtoken";
// env환경변수 라이브러리
import dotenv from "dotenv";
// 토큰검증 미들웨어
import { auth } from "./authMiddleware.js";

const app = express();
// 환경변수 사용선언
dotenv.config();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("this main");
});

//  POST login요청이 들어오면 body에 id와 password를 실어서 요청으로 가정해서 jwt를발급해준다.
app.post("/login", (req, res, next) => {
  const key = process.env.SECRET_KEY;
  // 받은 요청에서 db의 데이터를 가져온다 (로그인정보)
  const nickname = "JY";
  const profile = "images";
  let token = "";
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  token = jwt.sign(
    {
      type: "JWT",
      nickname: nickname,
      profile: profile,
    },
    key,
    {
      expiresIn: "15m", // 15분후 만료
      issuer: "토큰발급자",
    }
  );
  // response
  return res.status(200).json({
    code: 200,
    message: "token is created",
    token: token,
  });
});

app.get("/payload", auth, (req, res) => {
  const nickname = req.decoded.nickname;
  const profile = req.decoded.profile;
  return res.status(200).json({
    code: 200,
    message: "토큰이 정상입니다.",
    data: {
      nickname: nickname,
      profile: profile,
    },
  });
});

app.listen(port, () => {
  console.log(`${port}번 포트 에서 서버가 정상 구동중입니다.`);
});
