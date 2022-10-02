const express = require("express");
const router = express.Router();
const Attendence = require("../models/Attendence");
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

module.exports = router;
