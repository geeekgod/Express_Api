const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
const User = require("./models/users");

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

// Signup auth api endpoint

app.post("/auth/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userDat = { name: req.body.name, password: hashedPassword };
    const user = new User(userDat);

    User.find({ name: req.body.name })
      .then((user_t) => {
        if (user_t[0] !== undefined) {
          res.status(403).json({ errMsg: "User Already Exists" });
        } else {
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({ message: "User Created" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {
    res.status(500).json();
  }
});

// Signin auth api endpoint

app.post("/auth/signin", async (req, res) => {
  User.find({ name: req.body.name })
    .then(async (user_t) => {
      const user = user_t[0];
      if (!user) {
        return res.status(400).json({ err: "User not found please register" });
      } else {
        try {
          if (await bcrypt.compare(req.body.password, user.password)) {
            res.json({ message: { message: "Logged in!!" }, user });
          } else {
            res.json({ err: "Incorrect Password" });
          }
        } catch {
          res.status(500).json();
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
