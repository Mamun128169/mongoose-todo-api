const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

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

// Not Found Page middleware
app.use((req, res)) b 

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});
