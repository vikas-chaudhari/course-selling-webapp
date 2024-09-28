const express = require("express");
const courseRouter = express.Router();
const { coursesModel } = require("../models/course");

courseRouter.get("/preview", (req, res) => {
  res.json({ message: "course preview endpoint" });
});
courseRouter.post("/purchase", (req, res) => {
  res.json({ message: "course purchase endpoint" });
});
module.exports = { courseRouter };
