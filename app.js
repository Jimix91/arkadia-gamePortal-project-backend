require("dotenv").config();

const express = require("express");

const { connectDB } = require("./db");

const app = express();

app.use(express.json());


require("./config")(app);


app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (e) {
        next(e);
    }
});

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const gamesRoutes = require("./routes/games.routes");
app.use("/api", gamesRoutes);

const reviewsRoutes = require("./routes/reviews.routes");
app.use("/api", reviewsRoutes);


require("./error-handling")(app);

module.exports = app;

