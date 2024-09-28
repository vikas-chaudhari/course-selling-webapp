const express = require("express");
const adminRouter = express.Router();
const { adminsModel } = require("../models/admin");
const { hashPassword, compare } = require("../utils/bcrypt");
const { z } = require("zod");
const { signToken } = require("../utils/jwt");
const { adminAuth } = require("../middlewares/admin");
const { coursesModel } = require("../models/course");

// Add routes for admin login, admin signup, create a course, delete a course, add course content.
adminRouter.post("/signup", async (req, res) => {
  const admin = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    const adminSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string().min(3),
      lastName: z.string().min(3),
    });
    const hashedPassword = await hashPassword(admin.password);
    const validationResult = adminSchema.safeParse(admin);
    if (!validationResult.success) {
      res.json({ message: validationResult.error });
      return;
    } else {
      await adminsModel.create({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: hashedPassword,
      });
      res.json({ msg: "admin created" });
    }
  } catch (error) {
    res.json({ msg: error });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const admin = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const adminSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const validationResult = adminSchema.safeParse(admin);

    if (!validationResult.success) {
      res.json({ message: validationResult.error });
      return;
    } else {
      const adminData = await adminsModel.findOne({
        email: admin.email,
      });

      if (await compare(admin.password, adminData.password)) {
        const token = signToken(adminData._id.toString());
        res.json({ msg: "admin logged in", token });
      } else {
        res.json({ msg: "unauthenticated acces" });
      }
    }
  } catch (error) {
    res.json({ msg: error });
  }
});
adminRouter.post("/add-course", adminAuth, async (req, res) => {
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    creatorId: req.admin,
  };
  try {
    const courseSchema = z.object({
      title: z.string().min(5).max(30),
      description: z.string().min(5).max(500),
      price: z.number(),
      imageUrl: z.string(),
      creatorId: z.string(),
    });
    const validationResult = courseSchema.safeParse(course);
    if (!validationResult.success) {
      res.json({ validationResult: validationResult.error });
      return;
    }

    await coursesModel.create(course);
    res.json({ msg: "course created" });
  } catch (error) {
    res.json({ error });
  }
});
adminRouter.put("/update-course/:courseId", adminAuth, async (req, res) => {
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    creatorId: req.admin,
  };
  try {
    const courseData = await coursesModel.findOne({ _id: req.params.courseId });

    if (req.admin !== courseData.creatorId.toString()) {
      res.json({ msg: "This course is not created by logged in user" });
      return;
    }
    const courseSchema = z.object({
      title: z.string().min(5).max(30),
      description: z.string().min(5).max(500),
      price: z.number(),
      imageUrl: z.string(),
      creatorId: z.string(),
    });
    const validationResult = courseSchema.safeParse(course);
    if (!validationResult.success) {
      res.json({ validationResult: validationResult.error });
      return;
    }
    await coursesModel.updateOne({ _id: req.params.courseId }, course);
    res.json({ msg: "course updated" });
  } catch (error) {
    res.json({ error: error + "" });
  }
});
adminRouter.delete("/delete-course/:courseId", adminAuth, async (req, res) => {
  try {
    const courseData = await coursesModel.findOne({ _id: req.params.courseId });

    if (req.admin !== courseData.creatorId.toString()) {
      res.json({ msg: "This course is not created by logged in user" });
      return;
    }
    await coursesModel.deleteOne({ _id: req.params.courseId });
    res.json({ msg: "course deleted" });
  } catch (error) {
    res.json({ error: error + "" });
  }
});
adminRouter.get("/", adminAuth, async (req, res) => {
  try {
    const courses = await coursesModel.find({ creatorId: req.admin });
    res.json(courses);
  } catch (error) {
    res.json({ error: error + "" });
  }
});

module.exports = { adminRouter };
