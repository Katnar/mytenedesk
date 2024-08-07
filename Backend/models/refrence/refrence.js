const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const refrencesSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    description: { type: String, required: true },
    center: { type: ObjectId },
    location: { type: String },
    contact: { type: String, required: true },
    contactPhone: { type: String },
  },
  { timestamps: true }
);

const Refrences = mongoose.model("Refrences", refrencesSchema);

module.exports = Refrences;
