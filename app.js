const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
app.use("/api/contacts", contactsRouter);
app.use(cors());
app.use.apply(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book qpplication." });
});
app.use("/api/contacts", contactsRouter);
module.exports = app;
