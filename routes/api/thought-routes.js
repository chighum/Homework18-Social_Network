const router = require("express").Router();
const { User, Thought } = require("../../models");
const {
  getAllThoughts,
  getOneThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts routes
router.route("/").get(getAllThoughts).post(postThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(putThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(postReaction).delete(deleteReaction);

module.exports = router;
