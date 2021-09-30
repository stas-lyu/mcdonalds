// load up the express framework and body-parser helper
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });

// this is where we'll handle our various routes from
const routes = require("./routes/routes.js")(app, fs);

const server = app.listen(3000, () => {
  console.log("listening on port %s...", server.address().port);
});
