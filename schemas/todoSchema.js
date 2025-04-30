const { Schema, model } = require("mongoose");

// design todo schema
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// define the todo model
const Todo = model("todo", todoSchema);

// module export
module.exports = Todo;
