const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUserJwt } = require("../utils/tokens.js");
const security = require("../middleware/security");

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.send("authentication");
});

router.post("/register", async (req, res, next) => {
  try {
    //take the user, email, and password and create a new user in the database.
    const user = await User.register(req.body);
    const token = createUserJwt(user);

    // console.log(req.body);
    return res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //take users email and password and attempting to authenticate them
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    // console.log(token);
    return res.status(200).json({ user, token });
  } catch (e) {
    next(e);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = await User.makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
