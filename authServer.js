require("dotenv").config();

const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./data/users.json").userDB;

const app = express();
const server = http.createServer(app);

const refreshTokensDB = []; // to store the refresh tokens when they are generated.

app.use(express.json());

server.listen(4000, function () {
  console.log("Authentication server is listening on port: 3000");
});
