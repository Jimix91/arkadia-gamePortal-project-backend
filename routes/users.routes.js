const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const Game = require("../models/Games.model");
const Review = require("../models/Reviews.model");

const FAVORITE_FIELDS = "title image platforms averageRating developer year";

router.get("/users/me", isAuthenticated, async (req, res) => {
  const userId = req.payload._id;

  try {
    const [user, reviews] = await Promise.all([
      User.findById(userId).populate("favorites", FAVORITE_FIELDS),
      Review.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("game", FAVORITE_FIELDS),
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      favorites: user.favorites || [],
      reviews: reviews || [],
    });
  } catch (err) {
    console.log("Error loading user profile", err);
    res.status(500).json({ error: "Error loading user profile" });
  }
});

router.post("/users/favorites/:gameId", isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  const { gameId } = req.params;

  try {
    const gameExists = await Game.exists({ _id: gameId });
    if (!gameExists) {
      return res.status(404).json({ error: "Game not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: gameId } },
      { new: true }
    ).populate("favorites", FAVORITE_FIELDS);

    res.json({ favorites: updatedUser.favorites || [] });
  } catch (err) {
    console.log("Error adding favorite", err);
    res.status(500).json({ error: "Error adding favorite" });
  }
});

router.delete("/users/favorites/:gameId", isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  const { gameId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: gameId } },
      { new: true }
    ).populate("favorites", FAVORITE_FIELDS);

    res.json({ favorites: updatedUser?.favorites || [] });
  } catch (err) {
    console.log("Error removing favorite", err);
    res.status(500).json({ error: "Error removing favorite" });
  }
});

module.exports = router;
