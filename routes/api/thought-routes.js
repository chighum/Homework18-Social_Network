const router = require("express").Router();

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
router.route("/:thoughtId/reactions").post(postReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
