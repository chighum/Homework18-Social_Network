const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/users routes
router.route("/").get(getAllUsers).post(postUser);

// /api/users/:userId routes
router.route("/:userId").get(getOneUser).put(putUser).delete(deleteUser);

// //api/users/:userId/friends/:friendId routes
router
  .route("/:userId/friends/:friendId")
  .post(postFriend)
  .delete(deleteFriend);

module.exports = router;
