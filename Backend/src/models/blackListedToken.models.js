const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 24 * 60 * 60 * 1000,
    },
  },
  {
    timestamps: true,
  },
);

const blackListedTokenModel =
  mongoose.model.blackListedTokenModel ||
  mongoose.model("BlackListedToken", blackListedTokenSchema);

module.exports = blackListedTokenModel;
