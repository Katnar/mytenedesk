const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    personalnumber: { type: String, trim: true, unique: true, required: true },

    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastName: { type: String, trim: true, required: true },

    role: { type: String },
    // password: { type: String, required: true },
    permission: { type: String },
    center: { type: ObjectId, default: null },
    arena: { type: ObjectId, default: null },
    /*
      ? 0 -  מנהל מערכת
     ? 1 - צפייה  
     ? 2 - עריכה  
     */

    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
