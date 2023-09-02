const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const homeRoute = async (req, res) => {
  try {
    const token = req.headers.cookie?.split("=")[1];
    if (!token) {
      res.json({
        status: 404,
        message: "User session not found",
      });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      status: 200,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = homeRoute;
