// {
//   name: 'Khushboo',
//   age: 20,
//   _id: new ObjectId('65cf3be35b3a0288771af1bb'),
//   __v: 0
// }

// __v is the version of document

const mongoose = require("mongoose");
const validator = require("validator");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  //   useCreateIndex: true,
  // useFindAndModify: false,
});

/*
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

const Task = mongoose.model("Task", {
  name: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    completed: false,
  },
});


// const me = new User({
//   name: "                     Camille12345        ",
//   email: "camille123@gmail.com",
//   password: "123456789"
// });

const task1 = new Task({
  name: "Planning",
  description: "                 Project Planning ",
});
*/

// task1.save()
//   .then(() => {
//     console.log(task1);
//   })
//   .catch((error) => {
//     console.log("Error! ", error);
//   });
