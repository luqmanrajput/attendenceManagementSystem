const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendenceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
  },
  hasMarked: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("attendence", AttendenceSchema);
