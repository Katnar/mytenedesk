const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hativasSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    centerId: { type: ObjectId },
  },
  { timestamps: true }
);

const Hativas = mongoose.model("Hativas", hativasSchema);

module.exports = Hativas;
