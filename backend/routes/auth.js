const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  // console.log(req.user);
  passport.authenticate("local", (err, user, info) => {
    console.log("user at beginning of auth:", user);
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: info.message });
    }
    // passport req.login
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: "Error while logging in" });
      }
      res.json(user);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  console.log("route /auth/signup was called");

  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);
  if (username === "" || password === "") {
    console.log("username and password not filled");
    return res
      .status(400)
      .json({ message: "Username and Password can't be empty" });
  }

  //checks if username has 4-8 characters and contains a number
  let regex = new RegExp("^(?=.*[0-9])(?=.{4,8})");
  if (!regex.test(password)) {
    console.log("password stupid");
    return res.status(400).json({
      message:
        "The password must be between 4 and 8 characters long and has to contain at least one digit."
    });
  }

  User.findOne({ username }, "username", (err, user) => {
    console.log("looking for user");
    if (user !== null) {
      console.log("user found. make up another one!");
      return res.status(400).json({ message: "This user already exists." });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(userDocument => {
        res.json(userDocument);
        // needs to automatically login the user
        req.login(userDocument, err => {
          if (err) {
            return res.status(500).json({ message: "Error while logging in" });
          }
          res.json(userDocument);
        });
      })
      .catch(err => {
        //TODO - Need to send a error response
      });
  });
});

router.get("/logout", (req, res) => {
  console.log("route /logout was called");
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  console.log("route /loggedin was called.");
  res.json(req.user);
});

//SOCIAL LOGIN GOOGLE

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/home");
  }
);

//SOCIAL LOGIN FACEBOOK

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

module.exports = router;
