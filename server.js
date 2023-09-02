const express = require("express");
const signupRoute = require("./features/signup/signup");
const loginRoute = require("./features/login/login");
const homeRoute = require("./features/home/home");
const bodyParser = require("body-parser");
const { connect } = require("./db/connection");

const app = express();
connect();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/api/signup").post((req, res) => {
  signupRoute(req, res);
});

app.route("/api/login").post((req, res) => {
  loginRoute(req, res);
});

app.route("/api/home").get((req, res) => {
  homeRoute(req, res);
});

// app.post("/api/signup", signupRoute);

app.listen(3000, () => {
  console.log("Server started");
});
