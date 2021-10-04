const ordersRoutes = (app, fs) => {
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPathOrders,
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
    filePath = dataPathOrders,
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
  app.get("/orders", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  // CREATE
  app.post("/orders", (req, res) => {
    readFile((orders) => {
      try {
        orders.push(req.body);
        writeFile(JSON.stringify(orders, null, 2), () => {
          res.status(200);
          res.json(orders);
        });
      } catch {
        res.json({ message: "Internal server error" });
      }
    }, true);
  });

  // DELETE
  app.delete("/orders/:id", (req, res) => {
    readFile((orders) => {
      writeFile(
        JSON.stringify(
          (orders = orders.filter(
            (order) => Number(order.id) !== Number(req.params.id)
          ))
        ),
        () => {
          res.status(200).send(`order id:${req.params.id} removed`);
        }
      );
      res.json({ orders: orders });
    }, true);
  });
};
const dataPathOrders = "./data/orders.json";

module.exports = ordersRoutes;
