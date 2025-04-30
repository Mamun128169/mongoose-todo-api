const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routeHandlers/userHandler");
const todoRoute = require("./routeHandlers/todoHandler");

// app middleware
const app = express();
dotenv.config();
app.use(express.json());

// connect mongoDB with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-todos-api")
  .then(() => {
    console.log("MongoDB is connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

// subApp mount
app.use("/users", userRoute);
app.use("/todos", todoRoute);

// Not Found Page middleware
app.use((req, res, next) => {
  res.status(404).json({ Error: "Route not Found!" });
});

// default error handler middleware
app.use((err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});
