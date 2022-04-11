import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3001;
dotenv.config();

app.get("/welcome", (req, res) => {
  res.send("Hello World!");
});

app.get("/github", (req, res) => {
  // github토큰을 받아오는 endpoint
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_KEY;
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/josn",
    },
  })
    .then((res) => {
      const accessToken = res.data.access_token; // github api에서 보내주는 엑세스토큰
      res.redirect(`/welcome?access_token=${accessToken}`);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
