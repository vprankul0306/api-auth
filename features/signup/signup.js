const express = require("express");
const { User } = require("../../db/models.js");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signupRoute = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existedUser = await User.findOne({ username, email });
    if (existedUser) {
      return res.json({
        status: "error",
        error: "Username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "ok",
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = signupRoute;
