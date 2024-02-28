const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  username = username.charAt(0).toUpperCase() + username.slice(1);
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required",
    };
  }

  //   Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate Username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

addUser({
  id: 105,
  username: "jess",
  room: "South Philly                 ",
});

addUser({
  id: 102,
  username: "emily",
  room: "South Philly                 ",
});

addUser({
  id: 103,
  username: "andrew",
  room: "South Philly                 ",
});

addUser({
  id: 104,
  username: "Gabriel",
  room: "Center City",
});

console.log(users);

// const res = addUser({
//   id: 101,
//   username: "jess",
//   room: "South Philly",
// });
// console.log(res);

const removedUser = removeUser(100);
console.log(removedUser);
console.log(users);

const gettingUser = getUser(102);
console.log(gettingUser);

const userList = getUsersInRoom("Center City");
console.log(userList);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
