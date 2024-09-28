const express = require("express");
const userRouter = express.Router();
const { usersModel } = require("../models/user");
const { hashPassword, compare } = require("../utils/bcrypt");
const { z } = require("zod");
const { signUserToken } = require("../utils/jwt");
const { userAuth } = require("../middlewares/user");

userRouter.post("/signup", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string().min(3),
      lastName: z.string().min(3),
    });
    const hashedPassword = await hashPassword(user.password);
    const validationResult = userSchema.safeParse(user);
    if (!validationResult.success) {
      res.json({ message: validationResult.error });
      return;
    } else {
      await usersModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      });
      res.json({ msg: "user created" });
    }
  } catch (error) {
    res.json({ msg: error + "" });
  }
});
userRouter.post("/signin", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const validationResult = userSchema.safeParse(user);

    if (!validationResult.success) {
      res.json({ message: validationResult.error });
      return;
    } else {
      const userData = await usersModel.findOne({
        email: user.email,
      });

      if (await compare(user.password, userData.password)) {
        const token = signUserToken(userData._id.toString());
        res.json({ msg: "user logged in", token });
      } else {
        res.json({ msg: "unauthenticated acces" });
      }
    }
  } catch (error) {
    res.json({ msg: error + "" });
  }
});
userRouter.get("/purchases", userAuth, async (req, res) => {
  res.json({ purchases: "success" });
});
module.exports = { userRouter };
