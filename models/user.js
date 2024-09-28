const mongoose = require("mongoose");

//Admin && User == _id, email, password, firstname, lastname

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
});
const usersModel = mongoose.model("users", usersSchema);
module.exports = { usersModel };
