const express = require("express");
const publisher = require("../controllers/publisher.controllers");
const router = express.Router();
router.route("/")
    .get(publisher.findAll)
    .post(publisher.createBrrow)
    .delete(publisher.deleteAll);
router.route("/:id")
    .get(publisher.FindOne)
    .put(publisher.update)
    .delete(publisher.delete);

module.exports = router;