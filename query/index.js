const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

//listen to events
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    const { id, content, postID, status } = data;

    const post = posts[postID];
    post.comments.push({ id, content, status });
  }

  if (type === "commentUpdated") {
    const { id, content, postID, status } = data;

    const post = posts[postID];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(4002, () => console.log("listeng on port 4002 "));
