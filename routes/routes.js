const userRoutes = require("./users");
const categoriesRoutes = require("./categories");
const dishesRoutes = require("./dishes");
const ordersRoutes = require("./orders");
const cartRoutes = require("./cart");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  userRoutes(app, fs);
  categoriesRoutes(app, fs);
  dishesRoutes(app, fs);
  ordersRoutes(app, fs);
  cartRoutes(app, fs);
};

module.exports = appRouter;
