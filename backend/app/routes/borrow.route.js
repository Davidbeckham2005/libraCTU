const express = require("express");
const borrow = require("../controllers/borrow.controllers");
const router = express.Router();
router.route("/")
    .get(borrow.findAll)
    .post(borrow.createBrrow)
    .delete(borrow.deleteAll);
router.route("/:id")
    .get(borrow.FindOne)
    .put(borrow.update)
    .delete(borrow.delete);

module.exports = router;