const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Mongo DB uri
const dbURI = `mongodb+srv://${process.env.APP_DB_USERNAME}:${process.env.APP_DB_PASSWORD}@cluster0.yx8a6.mongodb.net/${process.env.APP_NAME}?retryWrites=true&w=majority`;

const app = express();

const port = process.env.PORT || 3000;

// middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server is live on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.json({ message: "Hello From Api" });
});
