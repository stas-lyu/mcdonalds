const usersRoutes = (app, fs) => {
  //...unchanged ^^^

  // refactored helper methods
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

  // READ
  // Notice how we can make this 'read' operation much more simple now.
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
      // add the new user
      const userId = req.params["id"];
      delete data[userId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${userId} removed`);
      });
    }, true);
  });
};
const dataPathUsers = "./data/users.json";

module.exports = usersRoutes;
