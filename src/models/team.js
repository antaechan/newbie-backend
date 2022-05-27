const mongoose = require("mongoose");

const OSchemaDefinition = {
  teamName: String,
  leaderName: String,
};

const OSchemaOptions = { timestamps: true };
const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);
const TeamModel = mongoose.model("team", schema);

module.exports = TeamModel;
