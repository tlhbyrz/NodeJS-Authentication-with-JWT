const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auths");
const postRoutes = require("./routes/posts");

const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("db is connected");
});

//middlewares
app.use(express.json());

//Routes
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  console.log("Server runs and getting up.");
});
