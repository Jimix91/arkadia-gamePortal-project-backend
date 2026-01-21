const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    image: {
      type: String,
      default: ""
    },

    platforms: {
      type: [String],
      required: true,
      enum: ["PC", "PS5", "PS4", "XBOX", "Switch"]
    },

    description: {
      type: String,
      default: ""
    },

    developer: {
      type: String,
      trim: true,
      default: ""
    },

    year: {
      type: Number,
      min: 1970,
      max: new Date().getFullYear(),
      default: 1970,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Game", gameSchema);