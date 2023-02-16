const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use.apply(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book qpplication." });
});

module.exports = app;
