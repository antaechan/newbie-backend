const express = require("express");
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
    const { teamName, leaderName } = req.body;
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
    const succ = await TeamModel.deleteOne({ _id: id });
    return res.status(200).json({ isOk: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
