const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Task = require("../models/task");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);

    // To check token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token; // If its login from different devices, then  it will add the latest device details in tokens array of that particular user & get logout from that device only & not all devices
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
  //   console.log("Auth Middleware");
  //   next();
};

module.exports = auth;
