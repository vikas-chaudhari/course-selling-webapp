const mongoose = require("mongoose");
const { string } = require("zod");

//Admin && User == _id, email, password, firstname, lastname

const adminsSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const adminsModel = mongoose.model("admins", adminsSchema);
module.exports = { adminsModel };
