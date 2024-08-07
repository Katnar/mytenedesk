const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const registerunitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hativaId: { type: ObjectId },
  },
  { timestamps: true }
);

const RegisterUnits = mongoose.model("RegisterUnits", registerunitSchema);

module.exports = RegisterUnits;
