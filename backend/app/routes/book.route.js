const express = require("express");
const books = require("../controllers/book.controllers");
const router = express.Router();
router.route("/")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);
router.route("/:id")
    .get(books.FindOne)
    .put(books.update)
    .delete(books.delete);
router.route("/books/:id/comments").post(books.addComment)
router.route("/books/borrow").put(books.changeQuaylity)
module.exports = router;