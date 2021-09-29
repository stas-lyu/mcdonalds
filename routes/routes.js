const userRoutes = require("./users");
const categoriesRoutes = require("./categories");
const dishesRoutes = require("./dishes");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  userRoutes(app, fs);
  categoriesRoutes(app, fs);
  dishesRoutes(app, fs);
};

module.exports = appRouter;
