const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    coverImage: {
      type: String,
      default: ""
    },

    platform: {
      type: String,
      required: true,
      enum: ["PC", "PS5", "PS4", "Xbox", "Switch"]
    },

    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Game", gameSchema);