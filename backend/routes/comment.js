const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

const security = require("../middleware/security");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get(
  "/:commentId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const comment = await Comment.getComment(req.params.commentId);
      return res.status(200).json({ comment });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/user/:commentId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = await Comment.getUserFromComment(req.params.commentId);
      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/section/:commentSectionId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const comments = await Comment.getCommentSection(
        req.params.commentSectionId
      );
      return res.status(200).json({ comments });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/create",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      //takes the logged in user, and posts an event to the database
      const comment = await Comment.postComment(req.body);
      console.log(req.body);
      return res.status(201).json({ comment });
    } catch (e) {
      next(e);
    }
  }
);
module.exports = router;
