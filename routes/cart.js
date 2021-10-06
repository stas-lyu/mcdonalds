const cartRoutes = (app, fs) => {
  //...unchanged ^^^

  // refactored helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPathCart,
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
    filePath = dataPathCart,
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
  app.get("/cart", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  app.get("/cart/:id", (req, res) => {
    readFile((cart) => {
      const response = cart.filter((cartItem) => {
        return Number(cartItem.userId) === Number(req.params["id"]);
      });
      res.send(response);
    }, true);
  });
  // CREATE

  app.post("/cart/:id", (req, res) => {
    readFile((cart) => {
      try {
        const foundUser = cart.find(
          (cartItem) => req.body.userId === cartItem.userId
        );
        if (!foundUser) {
          cart.push(req.body);
          writeFile(JSON.stringify(cart, null, 2), () => {
            res.status(200).send(
              res.json(
                cart.filter((cartItem) => {
                  return cartItem.userId === req.body.userId;
                })
              )
            );
          });
        } else {
          cart.forEach((item) => {
            if (item.userId === req.body.userId) {
              item.cart = req.body.cart;
            }
          });
          writeFile(JSON.stringify(cart, null, 2), () => {
            res.status(200).send(
              res.json(
                cart.filter((cartItem) => {
                  return cartItem.userId === req.body.userId;
                })
              )
            );
          });
        }
      } catch {
        res.json({ message: "Internal server error" });
      }
    }, true);
  });

  // UPDATE
  app.put("/cart/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const cartItemId = req.params["id"];
      data[cartItemId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        return res.status(200).send(cartItemId);
      });
    }, true);
  });

  // DELETE
  app.delete("/cart/:id", (req, res) => {
    readFile((cart) => {
      writeFile(
        JSON.stringify(
          cart.filter(
            (cartItem) => Number(cartItem.id) !== Number(req.params.id)
          )
        ),
        () => {
          res.status(200).send(req.params.id);
        }
      );
    }, true);
  });
};
const dataPathCart = "./data/cart.json";

module.exports = cartRoutes;
