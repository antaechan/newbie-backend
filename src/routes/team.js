const express = require("express");
const MatchModel = require("../models/match");
const TeamModel = require("../models/team");

const router = express.Router();

router.get("/showTeams", async (req, res) => {
  try {
    const teamsData = await TeamModel.find({});
    console.log(teamsData);
    // send response as JSON format {data: teamsData, status: 200, ...}
    return res.status(200).json(teamsData);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/createTeam", async (req, res) => {
  try {
    // request parsing
    const { teamName, leaderName } = req.body;

    // create match
    const teamsData = await TeamModel.find({});
    if (teamsData.length > 0) {
      teamsData.map(async (val, i) => {
        const newMatch = new MatchModel({
          team1: teamName,
          team2: val.teamName,
        });
        const matchSucc = await newMatch.save();
      });
    }

    // create team
    const newTeam = new TeamModel({ teamName, leaderName });
    const succ = await newTeam.save();

    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/deleteTeam", async (req, res) => {
  try {
    const { id } = req.body;

    // delete match
    const targetTeam = await TeamModel.findOne({ _id: id });
    const matchSucc1 = await MatchModel.deleteMany({
      team1: targetTeam.teamName,
    });
    const matchSucc2 = await MatchModel.deleteMany({
      team2: targetTeam.teamName,
    });

    // delete team
    const succ = await TeamModel.deleteOne({ _id: id });

    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
