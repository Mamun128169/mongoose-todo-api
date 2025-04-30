const express = require("express");
const Todo = require("../schemas/todoSchema");

//define subApp route
const todoRoute = express.Router();

// get a todo
todoRoute.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// post a todo
todoRoute.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = new Todo({
      title,
      description,
      status,
    });
    await todo.save();
    res.status(201).json({ message: "Todo successfully created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// get a todo
todoRoute.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// get a todo
todoRoute.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// get a todo
todoRoute.get("/", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// module export
module.exports = todoRoute;
