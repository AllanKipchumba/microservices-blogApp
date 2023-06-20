const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  //emmit events to listeners
  axios.post("http://localhost:4000/events", event); //to post
  axios.post("http://localhost:4001/events", event); //to comments
  axios.post("http://localhost:4002/events", event); //to query
  axios.post("http://localhost:4003/events", event); //to moderation service

  res.send({ status: "OK" });
});

app.listen(4005, () => console.log("Listening on port 4005"));
