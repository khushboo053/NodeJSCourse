const multer = require("multer");
const express = require("express");
const sharp = require("sharp");

const User = require("../models/user");
const auth = require("../middleware/auth");
const deleteUserAndTasks = require("../middleware/deleteUserAndTasks");
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send("Internal server error");
  // }
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send("Error getting the user.");
  }

  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send("User not found");
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     res.status(500).send("Internal Server Error");
  //   });
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    // if (!user) {
    //   return res.status(404).send("User not found!");
    // }

    res.send(req.user);
  } catch (e) {
    res.status(400).send();
    console.log(e);
  }
});

router.delete("/users/me", auth, deleteUserAndTasks, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    sendCancelEmail(user.email, user.name)

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send("Internal server error");
    console.log(e);
  }
});

// However, in the router's POST route handler for /users/login, the toJSON method is not explicitly called. This is because JSON.stringify() is not directly invoked on the user object. Instead, the user object is included in the response object passed to res.send().

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    // res.send({ user: user.getPublicProfile(), token });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("Internal server error");
  }
});

router.post("/users/logout", auth, async (req, res) => {
  // t represents each individual token object in the tokens array.
  // t.token accesses the token property of each object.
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("User Logout of all devices successfully");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Plz upload a image of format either jpg, jpeg or png")
      );
    }
    cb(undefined, true);
  },
});

// To load image in html with base64 format: <img src="data:image/jpg;base64, binarydata">
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;

    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

    req.user.avatar = buffer;

    await req.user.save();
    res.send("Avatar uploaded successfully!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// To fetch image using url in HTML: <img src="http://localhost:3000/users/65d5b96b310d3d175c25a57e/avatar">
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
