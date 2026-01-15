require("dotenv").config();

const express = require("express"); // ⬅️ FALTABA

require("./db");

const app = express();

require("./config")(app);


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
