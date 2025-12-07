const express = require("express");
const user = require("../controllers/user.controller");
const router = express.Router();
router.route("/")
    .get(user.findAll)
    .post(user.create)
    .delete(user.deleteAll);
router.route("/:id")
    .get(user.FindOne)
    .put(user.update)
    .delete(user.delete);

router.route("/login").post(user.login);
router.route("/register").post(user.create)
// router.route("/borrow/:id").put(user.increaseborrow);
// router.route("/return/:id").put(user.decreaseborrow);

router.route("/books/:id")
    .post(user.addFavorite)
    .patch(user.removeFavorite);
router.route("/books/:id/comments").post(user.addComment)
// router.route("/borrow").put(user.increaseborrow)
module.exports = router;