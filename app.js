const express = require("express");
const morgan = require("morgan");
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError");


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use("/items", itemsRoutes);


// 404 handler
app.use(function (req, res, next) {
    return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});


module.exports = app;