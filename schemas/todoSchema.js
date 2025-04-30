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
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// define the todo model
const Todo = model("Todo", todoSchema);

// module export
module.exports = Todo;
