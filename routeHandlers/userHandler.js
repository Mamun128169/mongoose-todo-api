const express = require("express");
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

// define subApp route
const userRoute = express.Router();

// signUp route
userRoute.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, status } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json("unValid email, User may already registered!");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      status,
    });
    await user.save();

    res.status(201).json({ message: "User successfully created!", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error!" });
  }
});

// module export
module.exports = userRoute;
