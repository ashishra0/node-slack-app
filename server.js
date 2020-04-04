const express = require("express");
const axios = require("axios");
const app = express();

// status messages
const defaultMessage = "Oops! There is no power in the apartment🙀";
const newMessage = "Yayy! We have power";

// response object
let response = {
  status: defaultMessage
};

// helper methods

function changeStatus(message) {
  response.status = message;
}

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
    `https://api.getpostman.com/monitors/${process.env.slack_uuid}/run?apikey=${process.env.slack_key}`
  );
}

// routes

app.get("/", (req, res) => {
  sendReqToRaspberryPi().then(data => {
    res.sendStatus(data.status);
  });
});

app.post("/", (req, res) => {
  changeStatus(newMessage);
});

app.get("/power", (req, res) => {
  res.send(response);
  if (response.status === newMessage) {
    changeStatus(defaultMessage);
  }
});

app.post("/slack", (req, res) => {
  res.send(runCollection())
});

// run the server

app.listen("3000");
