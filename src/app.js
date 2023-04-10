import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let usersServer = [];
let tweetsServer = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const user = { username, avatar };

  usersServer.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  const checkUser = usersServer.find((u) => u.username === username);
  if (!checkUser) {
    res.send("UNIAUTHORIZED");
  }

  const tweets = { username, tweet };

  tweetsServer.push(tweets);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTenTweets = tweetsServer.slice(-10);
  if (tweetsServer.length === 0) {
    res.send([]);
  }
  const tweets = lastTenTweets.map((t) => {
    const user = usersServer.find((u) => u.username === t.username);

    return {
      username: t.username,
      avatar: user.avatar,
      tweet: t.tweet,
    };
  });
  res.send(tweets);
});

const PORT = 5000;
app.listen(PORT);
