const mongoose = require("mongoose");

// course = title, desc, price, imageurl, creatorID

const coursesSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: mongoose.Schema.Types.ObjectId,
});
const coursesModel = mongoose.model("courses", coursesSchema);
module.exports = { coursesModel };
