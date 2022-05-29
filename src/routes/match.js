const express = require("express");
const MatchModel = require("../models/match");
const TeamModel = require("../models/team");

const router = express.Router();

router.get("/showMatches", async (req, res) => {
  try {
    const matchsData = await MatchModel.find({});
    // send response as JSON format {data: teamsData, status: 200, ...}
    return res.status(200).json(matchsData);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/showPreMatches", async (req, res) => {
  try {
    const matchsData = await MatchModel.find({
      date: { $lte: new Date() },
    });

    return res.status(200).json(matchsData);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/updateMatchScore", async (req, res) => {
  try {
    const { id, team1Score, team2Score } = req.body;

    // update Match DB team1Score, team2Score
    const succ2 = await MatchModel.updateOne(
      { _id: id },
      { $set: { team1Score: team1Score, team2Score: team2Score } }
    );

    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/updateMatchDate", async (req, res) => {
  try {
    const { id, date } = req.body;
    // console.log(date);
    // console.log(typeof date);
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7));
    const day = parseInt(date.substring(8, 10));
    const hour = parseInt(date.substring(11, 13));
    const minute = parseInt(date.substring(14));
    const succ = await MatchModel.updateOne(
      { _id: id },
      { $set: { date: new Date(year, month - 1, day, hour, minute) } }
    );
    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
