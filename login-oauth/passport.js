import passport from "passport";
import { Strategy } from "passport-github";
("passport-github");
import dotenv from "dotenv";

dotenv.config();

const githubConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_KEY,
  callbackURL: "http://localhost:3001/github-login",
};

// accessToken = 받아온 인증토큰
// refreshToken = 새롭게 받은 토큰
// profile = github에서 보내준 이용자의 정보
// done(err, obj) = 세션에 저장하는 함수

const githubLoginVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("profile : ", profile);
    const {
      _json: { id, login, node_id },
    } = profile;
    const userInfo = { id, login, node_id };
    return done(null, userInfo);
  } catch (error) {
    return done(null, false, { msg: "올바르지 않는 인증입니다~" });
  }
};

// 세션에 저장하는 역할 ( deserializeUser에 전달 )
passport.serializeUser((user, done) => {
  done(null, user);
});

// 들어오는 요청마다 세션정보가 유효한지 검사하는 역할
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = () => {
  passport.use("github", new Strategy(githubConfig, githubLoginVerify));
};
