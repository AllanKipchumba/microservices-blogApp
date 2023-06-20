const express = require("express");
const bodyPasrser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyPasrser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const { content } = req.body;

  //store the comment
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentID, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  //emmit comment to event broker
  await axios.post("http://localhost:4005/events", {
    type: "commentCreated",
    data: {
      id: commentsByPostId,
      content,
      postID: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

//receive event from event broker
app.post("/events", async (req, res) => {
  console.log("Received event", req.body.type);

  const { type, data } = req.body;

  if (type === "commentModerated") {
    const { postID, id, status } = data;
    const comments = commentsByPostId[postID];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    // comment.status = status; //OUTPUTS UNDEFINED

    console.log(comments);

    // await axios.post("http://localhost:4005/events", {
    //   type: "commentUpdated",
    //   data: {
    //     id,
    //     status,
    //     postID,
    //     content,
    //   },
    // });
  }

  res.send({});
});

app.listen(4001, () => console.log("Listening on port 4001"));
