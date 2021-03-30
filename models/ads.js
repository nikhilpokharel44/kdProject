/** @format */

const mongoose = require("mongoose");

const addAdverts = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 250,
  },
  description: {
    type: String,
    required: true,
    min: 20,
    max: 450,
  },
  //only-posted-once
  totalRewardPoint: {
    type: Number,
    required: true,
    min: 10,
    max: 1000,
    default: 0,
  },
  //default
  rewardDistributed: {
    type: Number,
    required: true,
    max: 1000,
    min: 0,
    default: 0,
  },
  //default
  rewardRemaining: {
    type: Number,
    required: true,
    default: 0,
  },
  filePath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Added-Advertisement", addAdverts);
