const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const framesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Frames = mongoose.model("Frames", framesSchema);

module.exports = Frames;
