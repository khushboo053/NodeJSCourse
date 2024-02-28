const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port: http://localhost:${port}`);
});

// const multer = require("multer");
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// require("./db/mongoose");
// const User = require("./models/user");
// const Task = require("./models/task");
// const userRouter = require("./routers/user");
// const taskRouter = require("./routers/task");

// const app = express();
// require("dotenv").config()
// const port = process.env.PORT ;

// // app.use((req, res, next) => {
// // console.log(req.method, req.path);
// // next();
// // });

// // app.use((req, res, next) => {
// //   if (req.method === "GET") {
// //     res.send('GET requests are disabled! Go away!');
// //   } else {
// //     next();
// //   }
// // })

// // app.use((req, res, next) => {
// //   res.status(503).send('In Maintenance');
// // });

// // Automatically parse incoming JSON to us
// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// // const router = new express.Router();

// // router.get("/test", (req, res) => {
// //   res.send("This is my first router");
// // });

// // app.use(router);

// /*
// app.post("/users", async (req, res) => {
//   const user = new User(req.body);

//   try {
//     await user.save();
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }

//   // user
//   //   .save()
//   //   .then(() => {
//   //     res.status(201).send(user);
//   //   })
//   //   .catch((e) => {
//   //     res.status(400).send(e);
//   //   });
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }

//   // User.find({})
//   //   .then((users) => {
//   //     res.send(users);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send();
//   //   });
// });

// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);

//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send("Error getting the user.");
//   }

//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send("User not found");
//   //     }
//   //     res.send(user);
//   //   })
//   //   .catch((e) => {
//   //     console.log(e);
//   //     res.status(500).send("Internal Server Error");
//   //   });
// });

// app.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return res.status(404).send("User not found!");
//     }
//     res.send(`User Updated: ${user}`);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).send("User not found!");
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }
// });

// app.post("/tasks", async (req, res) => {
//   const task = new Task(req.body);

//   try {
//     await task.save();
//     res.status(201).send(task);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }
//   // task
//   //   .save()
//   //   .then(() => {
//   //     res.status(201).send(task);
//   //   })
//   //   .catch((e) => {
//   //     res.status(400).send(e);
//   //   });
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).send(tasks);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }

//   // Task.find({})
//   //   .then((tasks) => {
//   //     res.status(200).send(tasks);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send("Internal Server Error");
//   //   });
// });

// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const task = await Task.findById(_id);
//     if (!task) {
//       return res.status(404).send("Task not found!");
//     }
//     res.status(200).send(task);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }

//   // Task.findById(_id)
//   //   .then((task) => {
//   //     if (!task) {
//   //       return res.status(404).send("Task not found");
//   //     }
//   //     res.send(task);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send("Internal server error");
//   //   });
// });

// app.patch("/tasks/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "description", "completed"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Updates" });
//   }
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!task) {
//       return res.status(404).send("Task not found!");
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) {
//       return res.status(404).send("Task not found!");
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(500).send("Internal server error");
//   }
// });
// */

// // const myFun = async () => {
// //   const password = "abc12345";
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   console.log(password);
// //   console.log(hashedPassword);

// //   const isMatch = await bcrypt.compare("abc12345", hashedPassword);
// //   console.log(isMatch); //true
// // };

// const myFun2 = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// /*
// const pet = {
//   name: "Blue",
// };

// // This function is internally called in below JSON.stringify thats why output is {}
// pet.toJSON = function () {
//   // console.log(this);
//   // return this;
//   return {};
// };

// console.log(JSON.stringify(pet));
// */

// const main = async () => {
//   // const task = await Task.findById("65d4847bd6e2b59be64477f8");
//   // await task.populate("owner")
//   // console.log(task.owner);

//   const user = await User.findById("65d44db6f998f8d7652cbfdb").populate(
//     "tasks"
//   );
//   console.log(user.tasks);
// };

// // main();

// // myFun();
// // myFun2();
// // output: JSON web token : 3 distinct parts() separated by periods (base 64 encoded json string)
// // - Header:   Algorithm + type of token (JWT/ JWS or JWE)
// // - Payload: data that the user sent us and information about the user
// // - Signature: a signature to verify that the payload hasn't been tampered with

// // MULTER
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000, // size: 1MB
//   },
//   fileFilter(req, file, callback) {
//     // if (!file.originalname.endsWith(".pdf")) {
//     // return callback(new Error("Plz upload a pdf"));
//     // }

//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return callback(new Error("Plz upload a word doc"));
//     }

//     callback(undefined, true);

//     // callback(new Error("File must be a PDF"));
//     // callback(undefined, true);
//     // callback(undefined, false);
//   },
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my middleware");
// };

// // app.post("/upload", upload.single("upload"), (req, res) => {
// //   res.send("Uploaded Successfully");
// // });

// app.post(
//   "/upload",
//   // errorMiddleware,
//   upload.single('upload'),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// app.listen(port, () =>
//   console.log(`Server is up on port http://localhost:${port}`)
// );

// // WITHOUT MIDDLEWARE: New request -> run route handler
// //  WITH MIDDLEWARE: New request -> run all middleware functions -> run route handler
