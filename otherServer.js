const express = require("express");
const axios = require("axios")
const app = express();


function getResponseObject() {
  return axios.get('https://crimson-north-ceiling.glitch.me/response').then(res => {
    return res
  }).catch(err => {
    return err
  })
}

// send the default array of dreams to the webpage
app.get("/", (request, response) => {
  getResponseObject().then(res => {
    response.send(res.data)
  })
});

// listen for requests :)
app.listen("4000")
