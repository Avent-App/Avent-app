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

router.get("/:id", security.requireAuthenticatedUser, async (req, res) => {
  id = req.params.id;

  getUser = await User.fetchUserByID(id);

  res.send(getUser);
});

router.post(
  "/updateInfo/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      let image = req.files.image ? req.files.image: null; 
      const user = await User.updateUserFields(userId, req.body, image);
      const token = await createUserJwt(user);
      //Returns the updated user and the new user token.
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;
