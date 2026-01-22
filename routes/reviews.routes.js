const Review = require("../models/Reviews.model");
const Game = require("../models/Games.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

// Helper function to update average rating for a game
async function updateGameAverageRating(gameId) {
  try {
    const allReviews = await Review.find({ game: gameId });
    if (allReviews.length === 0) {
      await Game.findByIdAndUpdate(gameId, { averageRating: 0 });
      return 0;
    }
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;
    await Game.findByIdAndUpdate(gameId, { averageRating });
    return averageRating;
  } catch (err) {
    console.log("Error updating average rating", err);
    throw err;
  }
}


router.post("/reviews/backfill-averages", async (req, res, next) => {
  try {
    const games = await Game.find();
    for (let game of games) {
      await updateGameAverageRating(game._id);
    }
    res.json({ message: "Average ratings updated for all games" });
  } catch (err) {
    console.log("Error backfilling averages", err);
    res.status(500).json({ error: "Error backfilling averages" });
  }
});

router.post("/reviews/game/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const newReview = req.body;
  const authorId = req.payload._id;

  try {
    
    newReview.game = gameId;
    newReview.author = authorId;
    
    const reviewFromDB = await Review.create(newReview);
    
    await updateGameAverageRating(gameId);
    
    res.status(201).json(reviewFromDB);
  } catch (err) {
    console.log("Error create new Review", err);
    res.status(500).json({ error: "Error create new Review" });
  }
});



router.get("/reviews/game/:gameId", (req, res, next) => {
  const { gameId } = req.params;

  Review.find({ game: gameId })
    .populate("author", "name")
    .then((reviewFromDB) => {
      res.json(reviewFromDB);
    })
    .catch((err) => {
      console.log("Error getting review for game from DB", err);
      res.status(500).json({ error: "Error getting review for game from DB" });
    });
});


router.put("/reviews/:reviewId", isAuthenticated, async (req, res, next) => {
  const { reviewId } = req.params;
  const newReview = req.body;
  const userId = req.payload._id;
  const userRole = req.payload.role;

  try {
    const review = await Review.findById(reviewId);
    
    // Admin puede editar cualquier review, usuario solo la suya
    if (userRole !== "admin" && review.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "No tienes permiso para editar esta reseña" });
    }

    const reviewFromDB = await Review.findByIdAndUpdate(reviewId, newReview, { new: true });
    
    const gameId = reviewFromDB.game;
    await updateGameAverageRating(gameId);
    
    res.json(reviewFromDB);
  } catch (err) {
    console.log("Error updating review ID from DB", err);
    res.status(500).json({ error: "Error updating review ID from DB" });
  }
});


router.delete("/reviews/:reviewId", isAuthenticated, async (req, res, next) => {
  const { reviewId } = req.params;
  const userId = req.payload._id;
  const userRole = req.payload.role;

  try {
    const review = await Review.findById(reviewId);
    
    // Admin puede eliminar cualquier review, usuario solo la suya
    if (userRole !== "admin" && review.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta reseña" });
    }

    const reviewFromDB = await Review.findByIdAndDelete(reviewId);
   
    if (reviewFromDB) {
      const gameId = reviewFromDB.game;
      await updateGameAverageRating(gameId);
    }
    
    res.json(reviewFromDB);
  } catch (err) {
    console.log("Error deleting review ID from DB", err);
    res.status(500).json({ error: "Error deleting review ID from DB" });
  }
});

module.exports = router;