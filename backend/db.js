const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://luqman:123@cluster0.k0isxmw.mongodb.net/attendenceMS?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, () => {
    console.log("Database Connected Successfully!");
  });
};

module.exports = connectToMongo;
