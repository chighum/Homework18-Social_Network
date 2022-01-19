const { User, Thought } = require("../models");

module.exports = {
  // /api/thoughts
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought and push the thought's _id to the associated user's thoughts array
  postThought(req, res) {
    // req.body needs userId
    Thought.create(req.body)
      .then((thought) =>
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } }
        )
      )
      .then(() => res.status(200).json({ message: "Thought added!" }))
      .catch((err) => res.status(500).json(err));
  },

  // /api/thoughts/:thoughtId
  // GET a single thought by its _id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id
  putThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({ message: "Thought succesfully updated!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { username: thought.username },
              { $pull: { thoughts: thought._id } }
            )
      )
      .then(() =>
        res.status(200).json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // /api/thoughts/:thoughtId/reactions

  // POST to create a reaction stored in a single thought's reactions array
  postReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res
              .status(200)
              .json({ message: "Thought succesfully updated with reaction!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // /api/thoughts/:thoughtId/reactions/:reactionId
  // DELETE to remove a reaction by the reactions reactionId value
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res
              .status(200)
              .json({ message: "Reaction successfully deleted from thought!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
