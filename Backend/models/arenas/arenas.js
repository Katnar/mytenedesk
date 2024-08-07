const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const arenasSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    units: { type: [ObjectId], required: true },
  },
  { timestamps: true }
);

const Arenas = mongoose.model("Arenas", arenasSchema);

module.exports = Arenas;
