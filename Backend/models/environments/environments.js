const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const environmentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reality: { type: Number, required: true },
    code: { type: String },
  },
  { timestamps: true }
);

const Environments = mongoose.model("Environments", environmentsSchema);

module.exports = Environments;
