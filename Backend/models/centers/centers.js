const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const centersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Centers = mongoose.model("Centers", centersSchema);

module.exports = Centers;
