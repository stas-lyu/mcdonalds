const dishesRoutes = (app, fs) => {
  //...unchanged ^^^

  // refactored helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPathDishes,
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
    filePath = dataPathDishes,
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
  app.get("/dishes", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  app.get("/dishes/:id", (req, res) => {
    readFile((dishes) => {
      const response = dishes.filter((dish) => {
        return Number(dish.categoryId) === Number(req.params["id"]);
      });
      return res.status(200).send(response);
    }, true);
  });
  // CREATE

  app.post("/dishes", (req, res) => {
    readFile((dishes) => {
      try {
        const foundDishes = dishes.find(
          (category) => req.body.name === category.name
        );
        if (!foundDishes) {
          req.body.id = Date.now();

          dishes.push(req.body);

          writeFile(JSON.stringify(dishes, null, 2), () => {
            res.status(200).send(
              res.json(
                dishes.filter((dish) => {
                  return dish.categoryId === req.body.categoryId;
                })
              )
            );
          });
        } else {
          res.status(403).json({ message: "Category already created!" });
        }
      } catch {
        res.json({ message: "Internal server error" });
      }
    }, true);
  });

  // UPDATE
  app.put("/dishes/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const DishId = req.params["id"];
      data[DishId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).send(DishId);
      });
    }, true);
  });

  // DELETE
  app.delete("/dishes/:id", (req, res) => {
    readFile((dishes) => {
      writeFile(
        JSON.stringify(
          dishes.filter((dish) => Number(dish.id) !== Number(req.params.id))
        ),
        () => {
          res.status(200).send(req.params.id);
        }
      );
    }, true);
  });
};
const dataPathDishes = "./data/dishes.json";

module.exports = dishesRoutes;
