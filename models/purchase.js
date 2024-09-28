const mongoose = require("mongoose");

// purchases = id courseid, userid

const purchasesSchema = new mongoose.Schema({
  courseId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
});
const purchasesModel = mongoose.model("purchases", purchasesSchema);
module.exports = { purchasesModel };
