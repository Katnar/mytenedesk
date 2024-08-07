const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const professionsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isCritial: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Professions = mongoose.model("Professions", professionsSchema);

module.exports = Professions;
