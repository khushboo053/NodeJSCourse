require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("65d2ef2d3f85531320ba5457")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
