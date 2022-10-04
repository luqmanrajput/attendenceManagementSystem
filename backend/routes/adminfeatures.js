const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Attendence = require("../models/Attendence");
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

module.exports = router;
