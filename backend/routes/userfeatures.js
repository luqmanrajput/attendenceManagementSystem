const express = require("express");
const router = express.Router();
const Attendence = require("../models/Attendence");
const { body, validationResult } = require("express-validator");
const Leave = require("../models/Leave");
const fetchuser = require("../middleware/fetchuser");
// Route for Marking attendence (api/userfeatures/markattendence)
router.post("/markattendence", fetchuser, async (req, res) => {
  let success = false;
  let dateCheck = false;
  let attendCheck = await Attendence.findOne({ date: req.body.todaysDate });
  if (attendCheck) {
    return res.status(400).json({ dateCheck });
  }
  try {
    const userId = req.user.id;
    const attendence = await new Attendence({
      user: userId,
      date: req.body.todaysDate,
    });
    attendence.save();
    success = true;
    dateCheck = true;
    console.log(dateCheck);
    res.json({ attendence, success, dateCheck });
  } catch (error) {
    console.log(error);
  }
});

// Route for Applying Leave (api/userfeatures/applyleave)
router.post(
  "/applyleave",
  fetchuser,
  [body("message", "Required").isLength({ min: 10, max: 100 })],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    let dateCheck = false;
    let leaveCheck = await Leave.findOne({ date: req.body.leaveDate });
    if (leaveCheck) {
      return res.status(400).json({ dateCheck });
    }
    try {
      const userId = req.user.id;
      const leave = await new Leave({
        user: userId,
        message: req.body.message,
        date: req.body.leaveDate,
      });
      leave.save();
      success = true;
      res.json({ success, dateCheck });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
