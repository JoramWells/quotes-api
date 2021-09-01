const express = require("express");
const cors = require("cors");
const data = require("./quotes");

// const fetch = require('node-fetch')
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000

// console.log(data[0])
app.get("/quotes", (req, res) => {
  res.send(data);
});

app.get("/quote/:id", (req, res) => {
  const id = req.params.id;
  // console.log(data[id])
  res.send(data[id]);
});

app.get("/quotes/rand", (req, res) => {
  const id = Math.floor(Math.random() * data.length);
  res.send(data[id]);
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
