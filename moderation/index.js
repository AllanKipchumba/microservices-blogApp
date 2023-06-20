const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//watch for events
app.post("/events", async (req, res) => {
  const {
    type,
    data: { id, postID, content },
  } = req.body;

  if (type === "commentCreated") {
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data: {
        id,
        postID,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => console.log("Listening on 4003"));
