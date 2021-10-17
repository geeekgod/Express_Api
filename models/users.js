const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;
