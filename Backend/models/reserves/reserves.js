const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reservesSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    personalNumber: { type: String, required: true },
    personalId: { type: String, required: true },
    rank: { type: String },
    serviceType: { type: String },
    frame: { type: ObjectId, default: null },
    registerUnit: { type: ObjectId, required: true, default: null },
    center: { type: ObjectId, default: null },
    hativa: { type: ObjectId, default: null },
    occupation: { type: ObjectId, default: null },
    // frame: { type: String, default: "" },
    // registerUnit: { type: String, default: "" },
    // center: { type: String, required: true, default: "" },
    // hativa: { type: String, required: true, default: "" },
    // occupation: { type: String, default: "" },
    plugaCode: { type: String },
    manningType: { type: String },
    dailDate: { type: Date },
    mainStatus: { type: String },
    subStatus: { type: String },
    shamap: { type: Boolean },
    isAppended: { type: Boolean },
    presetDate: { type: Date },
    releaseDate: { type: Date },
    centerRef: { type: String },
    centerNotes: { type: String },
    arenaNotes: { type: String },
    isValid: { type: Boolean },
    isDisconnected: { type: Boolean },
    absentee: { type: Boolean },
    welfare: { type: String },
    envCode: { type: Number },
  },
  { timestamps: true }
);

const Reserves = mongoose.model("Reserves", reservesSchema);

module.exports = Reserves;
