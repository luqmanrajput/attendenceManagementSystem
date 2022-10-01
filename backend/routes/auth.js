const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// My Sign
const JWT_SECRET = "mySecretString";

// Route for Creating User "/api/auth/createuser".
router.post(
  "/createuser",
  [
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // For displaying alerts on UI
    let success = false;

    // Checking validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Checking if email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exists!" });
      }

      // Creating user

      // a-generating secure password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // b-adding user to database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passsword: secPass,
      });

      //   Generating Token
      const Data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(Data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error occured" });
    }
  }
);

// Route for Login in User "/api/auth/login".
router.post(
  "/login",
  [body("email", "Invalid Email").isEmail(), body("password").exists()],
  async (req, res) => {
    // For displaying alerts on UI
    let success = false;

    // Deconstructing
    const { email, password } = req.body;

    // Checking validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Authentication

    try {
      // Authenticating Email

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Enter valid email" });
      }

      // Authenticating password
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res.status(400).json({ success, error: "Invalid Password" });
      }
      const Data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(Data, JWT_SECRET);
      success = true;
      console.log(success + authToken);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error occured" });
    }
  }
);

// Route for getting user details "/api/auth/getuser".
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error occured" });
  }
});

module.exports = router;
