const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaveSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  category: {
    type: String,
    default: "Sick Leave",
  },
});
module.exports = mongoose.model("leave", LeaveSchema);
