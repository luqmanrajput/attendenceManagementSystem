const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/AMS";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, () => {
    console.log("Database Connected Successfully!");
  });
};

module.exports = connectToMongo;
