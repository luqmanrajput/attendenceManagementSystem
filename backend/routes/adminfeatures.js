const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Attendence = require("../models/Attendence");
const Leave = require("../models/Leave");

// Route for getting users for (http://localhost:5000/api/adminfeatures/viewusers)
router.get("/viewusers", async (req, res) => {
  try {
    let success = false;
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ success, error: "not found" });
    }
    success = true;
    res.json({ success, users });
  } catch (error) {
    return res.json(error);
  }
});

// Route for getting users attendence record for (http://localhost:5000/api/adminfeatures/attendencerecord)

router.get("/attendencerecord/:key", async (req, res) => {
  let success = false;
  try {
    const users = await User.find({ email: req.params.key });
    if (!users) {
      return res.status(400).json({ success, error: "invalid email" });
    }
    const attendence = await Attendence.find({ user: users[0].id });
    if (!attendence) {
      return res.status(400).json({ success, error: "no record found" });
    }
    success = true;
    res.json({ success, attendence, users });
  } catch (error) {
    console.log(error);
  }
});
// Route for deleting users attendence record for (http://localhost:5000/api/adminfeatures/deleteattendence/:id)

router.delete("/deleteattendence/:id", async (req, res) => {
  let success = false;
  try {
    const attendence = await Attendence.findByIdAndDelete(req.params.id);
    if (!attendence) {
      return res.status(400).json({ success, error: "not deleted" });
    }
    success = true;
    res.json({ success, attendence });
  } catch (error) {
    console.log(error);
  }
});

// Route for viewing leaves for (http://localhost:5000/api/adminfeatures/manageleaves)

router.get("/manageleaves", async (req, res) => {
  let success = true;
  try {
    const leaves = await Leave.find({});
    if (!leaves) {
      return res.status(400).json({ success, error: "No leaves" });
    }
    success = true;
    res.json({ success, leaves });
  } catch (error) {
    res.json(error);
  }
});

// Route for deleting leaves record for (http://localhost:5000/api/adminfeatures/deleteleaves/:id)

router.delete("/deleteleaves/:id", async (req, res) => {
  let success = false;
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(400).json({ success, error: "not deleted" });
    }
    success = true;
    res.json({ success, leave });
  } catch (error) {
    console.log(error);
  }
});

// Route for accepting leaves record for (http://localhost:5000/api/adminfeatures/acceptleaves/:id)
router.post("/acceptleaves/:id", async (req, res) => {
  let success = false;
  try {
    let attendence = await Attendence.findOne({
      user: req.body.userId,
      date: req.body.leaveDate,
    });
    if (attendence) {
      return res.json({ success, error: "Attendence Already Marked" });
    }
    attendence = await new Attendence({
      user: req.body.userId,
      date: req.body.leaveDate,
      attendenceType: "leave",
    });
    attendence.save();
    const leave = await Leave.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, attendence, leave });
  } catch (error) {
    res.json(error);
  }
});

// Route for Generating report  for (http://localhost:5000/api/adminfeatures/generatereport/:id)
router.get("/generatereport/:key", async (req, res) => {
  let success = false;
  try {
    const user = await User.find({ email: req.params.key });
    if (!user) {
      return res.status(400).json({ success, error: "User doesn't exists" });
    }
    const userId = user.id;
    const attendence = await Attendence.find({ user: userId });
    if (!attendence) {
      return res
        .status(400)
        .json({ success, error: "No attendence record of the user found" });
    }
    const presentTypeAttend = await Attendence.find({
      attendenceType: "present",
    });
    const presentCount = presentTypeAttend.length;
    const leaveTypeAttend = await Attendence.find({ attendenceType: "leave" });
    const leaveCount = leaveTypeAttend.length;
    success = true;
    res.json({ success, user, presentCount, leaveCount });
  } catch (error) {
    res.json(error);
  }
});

// Route for Marking attendence (api/adminfeatures/markattendence)
router.post("/markattendence", async (req, res) => {
  let success = false;

  let users = await User.findOne({ email: req.body.attendEmail });
  if (!users) {
    return res.json({ success, error: "This user doesn't exists" });
  }

  let attendCheck = await Attendence.findOne({
    date: req.body.selectedDate,
    user: users.id,
  });
  if (attendCheck) {
    return res.json({ success, error: "Already Marked" });
  }
  try {
    const attendence = await new Attendence({
      user: users.id,
      date: req.body.selectedDate,
      attendenceType: "present",
    });
    attendence.save();
    success = true;
    res.json({ success, error: "Marked Present" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
