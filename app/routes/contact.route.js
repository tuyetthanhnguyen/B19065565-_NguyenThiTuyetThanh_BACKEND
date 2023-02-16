const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(contacts.finfAll)
  .post(contacts.create)
  .delete(contacts.deleteALl);

router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;
