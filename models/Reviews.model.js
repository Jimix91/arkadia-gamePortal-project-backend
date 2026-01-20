const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true
    }
    
  },
  {
    timestamps: true
  }
);

module.exports = model("Review", reviewSchema);