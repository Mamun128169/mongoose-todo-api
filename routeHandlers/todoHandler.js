const express = require("express");
const Todo = require("../schemas/todoSchema");
const checkUser = require("../middlewares/checkUser");

//define subApp route
const todoRoute = express.Router();

// get all todos
todoRoute.get("/all", checkUser, async (req, res) => {
  try {
    console.log(req.username);
    const todos = await Todo.find({}).populate(
      "author",
      "username status -_id"
    );
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// get a todo
todoRoute.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// post a todo
todoRoute.post("/", checkUser, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = new Todo({
      title,
      description,
      status,
      author: req.userId,
    });
    await todo.save();
    res.status(201).json({ message: "Todo successfully created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// post many todos
todoRoute.post("/many", async (req, res) => {
  try {
    const todos = await Todo.insertMany(req.body);
    res.status(201).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// update a todo
todoRoute.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: "active" },
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// get a todo
todoRoute.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo successfully deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error!" });
  }
});

// module export
module.exports = todoRoute;
