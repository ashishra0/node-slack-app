const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// status messages
const defaultMessage = "Oops! There is no power in thy apartment🙀"

// response object
let response = {
  "status": defaultMessage
}

// helper methods

function sendReqToRaspberryPi() {
  return axios
    .post("https://smee.io/mQAzpDaQKOQpXyr0")
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

function runCollection() {
  axios.post(
    `https://api.getpostman.com/monitors/${process.env.monitor_uuid}/run?apikey=${process.env.pm_key}`
  );
}

function saveRequestBody(req) {
  response.status= req.status
}

function reset() {
  response.status = defaultMessage;
}

// routes

app.get("/", (req, res) => {
  sendReqToRaspberryPi().then(data => {
    res.sendStatus(data.status);
  });
});

app.post("/", (req, res) => {
  saveRequestBody(req.body)
  res.sendStatus(200);
});

app.get("/response", (req, res) => {
  res.send(response);
  reset();
});

app.post("/slack", (req, res) => {
  res.send("Checking power status");
  runCollection();
});

// run the server

app.listen("3000");
