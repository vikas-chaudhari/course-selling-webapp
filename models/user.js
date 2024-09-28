const mongoose = require("mongoose");

//Admin && User == _id, email, password, firstname, lastname

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});
const usersModel = mongoose.model("admin", usersSchema);
module.exports = { usersModel };
