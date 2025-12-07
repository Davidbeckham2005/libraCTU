const express = require("express");
const staff = require("../controllers/staff.controllers");
const router = express.Router();
router.route("/")
    .get(staff.findAll)
    .post(staff.create)
    .delete(staff.deleteAll);
router.route("/:id")
    .get(staff.FindOne)
    .put(staff.update)
    .delete(staff.delete);
router.route("/login").post(staff.login);
module.exports = router;