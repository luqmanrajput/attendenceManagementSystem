const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Routes
// User authentication related
app.use("/api/auth", require("./routes/auth"));
// User features
app.use("/api/userfeatures", require("./routes/userfeatures"));
// Listening to port
app.listen(port, () => {
  console.log(`Attendence Management System Listening at port:${port}`);
});
