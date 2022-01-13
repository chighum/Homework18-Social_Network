const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

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

  // POST to create a new thought and push the thought's _id to the associated user's thoughts array

  // PUT to update a thought by its _id

  // DELETE to remove a thought by its _id

  // /api/thoughts/:thoughtId/reactions

  // POST to create a reaction stored in a single thought's reactions array

  // DELETE to remove a reaction by the reactions reactionId value
};
