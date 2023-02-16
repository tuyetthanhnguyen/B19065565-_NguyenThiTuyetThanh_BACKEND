const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
app.use(cors());
app.use.apply(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book qpplication." });
});
app.use("/api/contacts", contactsRouter);
module.exports = app;
