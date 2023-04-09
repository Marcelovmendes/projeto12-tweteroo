import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let usersServer = [];
let tweetsServer = [];

app.post("/sign-up", (req, res) => {
  const { usersname, avatar } = req.body;
  const user = { usersname, avatar };

  usersServer.push(user);
  res.send("OK");
});

app.post("/tweet", (req, res) => {
  const checkUser = usersServer.find((u) => u.usersname === usersname);
  if (!checkUser) {
    res.send("UNIAUTHORIZED");
  }

  const { usersname, tweet } = req.body;
  const tweets = { usersname, tweet };

  tweetsServer.push(tweets);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTenTweets = tweetsServer.slice(-10);
  const tweets = lastTenTweets.map((t) => {
    const user = usersServer.find((u) => u.usersname === t.username);
    return {
      username: t.username,
      avatar: user ? user.avatar : null,
      tweet: t.tweet,
    };
  });
  res.send(tweets);
});

const PORT = 5000;
app.listen(PORT);
