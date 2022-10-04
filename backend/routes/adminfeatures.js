const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Attendence = require("../models/Attendence");
// const { body, validationResult } = require("express-validator");
// const Leave = require("../models/Leave");
// const fetchuser = require("../middleware/fetchuser");

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

module.exports = router;
