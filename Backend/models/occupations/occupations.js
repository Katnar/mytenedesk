const mongoose = require("mongoose");

const occupationsSchema = new mongoose.Schema(
  {
    professionCode: { type: Number, required: true },
    description: { type: String },
    isCritical: { type: Boolean },
  },
  { timestamps: true }
);

const Occupations = mongoose.model("Occupations", occupationsSchema);

module.exports = Occupations;
