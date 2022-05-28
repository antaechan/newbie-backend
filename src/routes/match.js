const express = require("express");
const MatchModel = require("../models/match");

const router = express.Router();

router.get("/showMatches", async (req, res) => {
  try {
    const matchsData = await MatchModel.find({});
    console.log("matchsData:", matchsData);
    // send response as JSON format {data: teamsData, status: 200, ...}
    return res.status(200).json(matchsData);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/updateMatch", async (req, res) => {
  try {
    const { id } = req.body;
    const succ = await MatchModel.updateOne({ _id: id });
    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
