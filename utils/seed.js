const connection = require("../config/connection");
const { User } = require("../models");
const { usernames, emails } = require("./data");

connection.once("open", async () => {
  await User.deleteMany({});

  // Empty arrays for randomly generated users
  const users = [];
  const thoughts = [];
  const friends = [];
  for (let i = 0; i < 10; i++) {
    const username = usernames[i];
    const email = emails[i];
    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }
  await User.collection.insertMany(users);

  console.log("Seeding successful!");
});
