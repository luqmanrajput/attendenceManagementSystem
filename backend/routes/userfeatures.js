const express = require("express");
const router = express.Router();
const Attendence = require("../models/Attendence");
const { body, validationResult } = require("express-validator");
const Leave = require("../models/Leave");
const fetchuser = require("../middleware/fetchuser");
// Route for Marking attendence (api/userfeatures/markattendence)
router.post("/markattendence", fetchuser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  let attendCheck = await Attendence.findOne({
    date: req.body.todaysDate,
    user: userId,
  });
  if (attendCheck) {
    return res.status(400).json({ success, error: "Already Marked" });
  }
  try {
    const attendence = await new Attendence({
      user: userId,
      date: req.body.todaysDate,
      attendenceType: "present",
    });
    attendence.save();
    success = true;
    res.json({ attendence, success, error: "Marked Present" });
  } catch (error) {
    console.log(error);
  }
});

// Route for Applying Leave (api/userfeatures/applyleave)
router.post(
  "/applyleave",
  fetchuser,
  [body("message", "Required").isLength({ min: 10, max: 100 })],
  fetchuser,
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    let dateCheck = false;
    const userId = req.user.id;
    let leaveCheck = await Leave.findOne({
      date: req.body.leaveDate,
      user: userId,
    });
    if (leaveCheck) {
      return res.status(400).json({ dateCheck });
    }
    try {
      const leave = await new Leave({
        user: userId,
        date: req.body.leaveDate,
        message: req.body.message,
      });
      leave.save();
      success = true;
      dateCheck = true;
      res.json({ success, dateCheck });
    } catch (error) {
      console.log(error);
    }
  }
);

// Route for Viewing attendence (api/userfeatures/viewattendence)
router.get("/viewattendence", fetchuser, async (req, res) => {
  let success = false;
  const userId = req.user.id;
  try {
    const attendence = await Attendence.find({ user: userId });
    if (!attendence) {
      return res.status(400).json({ success, error: " NO attendence found" });
    }
    success = true;
    res.json({ success, attendence });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
