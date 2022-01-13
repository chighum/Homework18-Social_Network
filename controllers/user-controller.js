const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populated thought and friend data
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST a new user
  postUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a user by its _id
  putUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body)
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res
          .status(200)
          .json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // /api/users/:userId/friends/:friendId

  // POST a new friend to a user's friend list
  postFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friends: req.param.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
