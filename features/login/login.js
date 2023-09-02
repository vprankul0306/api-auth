const express = require("express");
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

const loginRoute = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existedUser = await User.findOne({ username });
    if (existedUser) {
      bcrypt.compare(password, existedUser.password, (err, result) => {
        if (result == true) {
          const payload = {
            username: existedUser.username,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5h",
          });
          res.cookie("token", token, { httpOnly: true });
          res.json({
            status: "ok",
            message: "User logged in successfully",
          });
        } else {
          res.json({
            status: "error",
            message: "Incorrect password",
          });
        }
      });
    } else {
      res.json({
        status: "error",
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = loginRoute;
