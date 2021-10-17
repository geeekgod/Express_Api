const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config Dot env to access env's
dotenv.config();

// Mongo DB uri
const dbURI = `mongodb+srv://${process.env.APP_DB_USERNAME}:${process.env.APP_DB_PASSWORD}@cluster0.yx8a6.mongodb.net/${process.env.APP_DB_NAME}?retryWrites=true&w=majority`;

const app = express();

const port = process.env.PORT || 3000;

// App start
mongoose
  .connect(dbURI)
  .then((res) => {
    // listen for requests
    console.log("connected to db", res);
    app.listen(port, () => {
      console.log("\nServer is live on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello From Api" });
});
