const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUserJwt } = require("../utils/tokens.js");
const security = require("../middleware/security");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.send("event posting");
});

router.post("/create", async (req, res, next) => {
  try {
    //takes the logged in user, and posts an event to the database
    const event = await event.createEvent(req.body);
    // const token = createUserJwt(user);

    console.log(req.body);
    return res.status(201).json({ event, token });
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
