require("../src/db/mongoose");
const Task = require("../src/models/task");
const User = require("../src/models/user");

// User.findByIdAndUpdate("65cf43463d409512a4053b3a", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeAndCount("65cf44ac087abd873fc8f87f", 2)
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("65cf5453de482b4cabb65a95").then((count) => {
    console.log(`Incomplete Tasks: ${count}`);
}).catch((e) => {
    console.log(e);
})
