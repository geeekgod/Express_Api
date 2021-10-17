const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const router = express.Router();

// Signup auth api endpoint

router.post("/signup", async (req, res) => {
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

router.post("/signin", async (req, res) => {
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

module.exports = router;
