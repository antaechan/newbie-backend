const mongoose = require("mongoose");

const OSchemaDefinition = {
  team1: String,
  team2: String,
  team1Score: {
    type: Number,
    default: 0,
  },
  team2Score: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
};

const OSchemaOptions = { timestamps: true };
const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);
const MatchModel = mongoose.model("match", schema);

module.exports = MatchModel;
