const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendenceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
    format: Date,
  },
  attendenceType: {
    present: {
      type: Boolean,
      default: true,
    },
    leave: {
      type: Boolean,
      default: false,
    },
  },
});
module.exports = mongoose.model("attendence", AttendenceSchema);
