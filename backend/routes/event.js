const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUserJwt } = require("../utils/tokens.js");
const security = require("../middleware/security");
const Event = require("../models/event");

// middleware that is specific to this router
router.use((req, res, next) => {
  // console.log("Time: ", Date.now());
  next();
});

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const events = await Event.getEvents(req.body);
    return res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
});

router.get("/:eventId", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const event = await Event.getEventById(req.params.eventId);
    return res.status(200).json({ event });
  } catch (err) {
    next(err);
  }
});

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //takes the logged in user, and posts an event to the database
    const event = await Event.createEvent(req.body);
    // const token = createUserJwt(user);

    // console.log(req.body);
    return res.status(201).json({ event });
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
