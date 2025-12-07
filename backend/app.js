const express = require("express");
const cors = require("cors");

const bookRouter = require("./app/routes/book.route.js");
const userRouter = require("./app/routes/user.route.js")
const staffRouter = require("./app/routes/staff.route.js")
const borrowRouter = require("./app/routes/borrow.route.js")
const authorRouter = require("./app/routes/author.route.js")
const publisherRouter = require("./app/routes/publisher.route.js")
const ApiEroor = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to manage library application");
});
app.use("/api/publisher", publisherRouter);
app.use("/api/author", authorRouter);
app.use("/api/borrow", borrowRouter)
app.use("/api/staff", staffRouter);
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);   //api mac nhien se co khi dung voi /api/contacts
app.use((req, res, next) => {
    return next(new ApiEroor(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    })
});
module.exports = app;