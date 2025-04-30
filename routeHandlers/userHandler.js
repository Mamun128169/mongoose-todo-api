const express = require("express");
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// logIn route
userRoute.post("/logIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ Error: "Authentication Problem!" });
    }

    // match the password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json("Authentication Problem!");
    }

    // generate JWT Token
    const payload = {
      username: user.username,
      userId: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).json({ message: "Successfully token generated!", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// module export
module.exports = userRoute;
