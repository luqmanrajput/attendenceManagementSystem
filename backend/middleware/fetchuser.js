const jwt = require("jsonwebtoken");
const JWT_SECRET = "mySecretString";

const fetchuser = (req, res, next) => {
  // Fetching token from header
  const token = req.header("auth-token");

  // Checking if token is available
  if (!token) {
    return res.status(401).send({ error: "Please authenticate token" });
  }

  // Verifying token and extracting id
  try {
    const string = jwt.verify(token, JWT_SECRET);
    req.user = string.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate token" });
  }
};
module.exports = fetchuser;
