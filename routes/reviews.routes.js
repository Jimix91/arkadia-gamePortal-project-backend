const Review = require("../models/Reviews.model");
const router = require("express").Router();

router.get("/reviews", (req, res, next) => {
  Review.find()
    .populate("author", "username")
    .populate("game", "title")
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      console.log("Error getting reviews", err);
      res.status(500).json({ error: "Error getting reviews" });
    });
});


router.post("/reviews", isAuthenticated, (req, res, next) => {
  const newReview = req.body;

  Review.create(newReview)
    .then((reviewFromDB) => {
      res.status(201).json(reviewFromDB);
    })
    .catch((err) => {
      console.log("Error create new Review", err);
      res.status(500).json({ error: "Error create new Review" });
    });
});

router.get("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .populate("author")
    .populate("game")
    .then((reviewFromDB) => {
      res.json(reviewFromDB);
    })
    .catch((err) => {
      console.log("Error getting review ID from DB", err);
      res.status(500).json({ error: "Error getting review ID from DB" });
    });
});


router.put("/api/reviews/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;
  const newReview = req.body;

  Review.findByIdAndUpdate(reviewId, newReview, { new: true })
    .then((reviewFromDB) => {
      res.json(reviewFromDB);
    })
    .catch((err) => {
      console.log("Error updating review ID from DB", err);
      res.status(500).json({ error: "Error updating review ID from DB" });
    });
});


router.delete("/api/reviews/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;

  Review.findByIdAndDelete(reviewId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("Error deleting review ID from DB", err);
      res.status(500).json({ error: "Error deleting review ID from DB" });
    });
});

module.exports = router;