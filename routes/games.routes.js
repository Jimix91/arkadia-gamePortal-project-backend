const { isAuthenticated } = require("../middleware/jwt.middleware");
const Game = require("../models/Games.model");
const router = require("express").Router();


router.get("/games", (req, res, next) => {
  const { platform } = req.query;
  const normalizedPlatform = platform ? platform.toUpperCase() : null;
  const filter = normalizedPlatform ? { platforms: normalizedPlatform } : {};

  Game.find(filter)
    .then((games) => {
      res.json(games);
    })
    .catch((err) => {
      console.log("Error getting games", err);
      res.status(500).json({ error: "Error getting games" });
    });
});

router.post("/games", isAuthenticated, (req, res, next) => {
  const newGame = req.body;

  Game.create(newGame)
    .then((gameFromDB) => {
      res.status(201).json(gameFromDB);
    })
    .catch((err) => {
      console.log("Error create new Game", err);
      res.status(500).json({ error: "Error create new Game" });
    });
});


router.get("/games/:gameId", (req, res, next) => {
  const { gameId } = req.params;

  Game.findById(gameId)
    .then((gameFromDB) => {
      res.json(gameFromDB);
    })
    .catch((err) => {
      console.log("Error getting game ID from DB", err);
      res.status(500).json({ error: "Error getting game ID from DB" });
    });
});


router.put("/games/:gameId", isAuthenticated, (req, res, next) => {
  const { gameId } = req.params;
  const newGame = req.body;

  Game.findByIdAndUpdate(gameId, newGame, { new: true })
    .then((gameFromDB) => {
      res.json(gameFromDB);
    })
    .catch((err) => {
      console.log("Error updating game ID from DB", err);
      res.status(500).json({ error: "Error updating game ID from DB" });
    });
});


router.delete("/games/:gameId", isAuthenticated, (req, res, next) => {
  const { gameId } = req.params;

  Game.findByIdAndDelete(gameId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("Error deleting game ID from DB", err);
      res.status(500).json({ error: "Error deleting game ID from DB" });
    });
});

module.exports = router;