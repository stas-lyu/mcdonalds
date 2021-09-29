const categoriesRoutes = (app, fs) => {
  //...unchanged ^^^

  // refactored helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPathCategories,
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
    filePath = dataPathCategories,
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
  app.get("/categories", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  // CREATE
  app.post("/categories", (req, res) => {
    readFile((data) => {
      // Note: this needs to be more robust for production use.
      // e.g. use a UUID or some kind of GUID for a unique ID value.
      const newCategoryId = Date.now().toString();
      data[newCategoryId] = req.body;
      req.body.id = newCategoryId;
      data.push(req.body);
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new category added");
      });
    }, true);
  });

  // UPDATE
  app.put("/categories/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const categoryId = req.params["id"];
      data[categoryId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`category id:${categoryId} updated`);
      });
    }, true);
  });

  // UPDATE
  app.patch("/categories/:id", (req, res) => {
    readFile((category) => {
      // add the new user
      const categoryId = req.params["id"];
      category[categoryId] = req.body;
      console.log(req.body);
      writeFile(JSON.stringify(category, null, 2), () => {
        res.status(200).send(`category id:${categoryId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/categories/:id", (req, res) => {
    readFile((categories) => {
      console.log(categories);
      writeFile(
        JSON.stringify(
          categories.filter(
            (category) => Number(category.id) !== Number(req.params.id)
          )
        ),
        () => {
          res.status(200).send(`category id:${req.params.id} removed`);
        }
      );
    }, true);
  });
};
const dataPathCategories = "./data/categories.json";

module.exports = categoriesRoutes;
