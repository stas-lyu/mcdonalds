const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokensDB = [];
require("dotenv").config();
const { JS } = require("json-server/lib/cli/utils/is");
const usersRoutes = (app, fs) => {
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPathUsers,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPathUsers,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  app.get("/users", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  // CREATE
  app.post("/users", (req, res) => {
    readFile((data) => {
      const newUserId = Date.now().toString();
      data[newUserId] = req.body;
      req.body.id = newUserId;
      data.push(req.body);
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new user added");
      });
    }, true);
  });

  // UPDATE
  app.put("/users/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const userId = req.params["id"];
      data[userId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${userId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/users/:id", (req, res) => {
    readFile((data) => {
      const userId = req.params["id"];
      delete data[userId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${userId} removed`);
      });
    }, true);
  });

  // This endpoint will register new user
  app.post("/register", (req, res) => {
    readFile(async (data) => {
      try {
        const foundUser = data.find((item) => req.body.email === item.email);
        if (!foundUser) {
          let hashPassword = await bcrypt.hash(req.body.password, 10);
          let newUser = {
            id: Date.now(),
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            isAdmin: req.body.isAdmin,
          };

          data.push(newUser);
          writeFile(JSON.stringify(data, null, 2), () => {
            return res.status(200).json({
              isAdmin: newUser.isAdmin,
              id: newUser.id,
            });
          });
        } else {
          return res.status(403).json({ message: "Registration failed" });
        }
      } catch {
        return res.json({ message: "Internal server error" });
      }
    }, true);
  });

  app.post("/login", (req, res) => {
    readFile(async (users) => {
      try {
        let foundUser = users.find((user) => req.body.email === user.email);
        if (foundUser) {
          let submittedPass = req.body.password;
          let storedPass = foundUser.password;

          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (passwordMatch) {
            const tokenEmail = req.body.email;
            const payload = { email: tokenEmail };

            const aToken = await generateAccessToken(payload);

            const rToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

            refreshTokensDB.push(rToken); // it will store the newly generated refresh tokens

            return res.status(200).send({
              isAdmin: foundUser.isAdmin,
              id: foundUser.id,
            });
          } else {
            res.status(403).json({ message: "Invalid email or password" });
          }
        } else {
          let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`; //fake password is used just to slow down the time required to send a response to the user
          bcrypt.compare(req.body.password, fakePass);
          res.status(403).json({ message: "Invalid email or password" });
        }
      } catch {
        res.status(400).json({ message: "Internal server error" });
      }
    }, true);
  });
};

async function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
}

const dataPathUsers = "./data/users.json";

module.exports = usersRoutes;
