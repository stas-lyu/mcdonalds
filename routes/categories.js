const multer = require("multer");
const fileExtension = require("file-extension");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "my_uploaded_files");
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + fileExtension(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    // Setting Image Size Limit to 2MBs
    fileSize: 20000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //Error
      cb(new Error("Please upload JPG and PNG images only!"));
    }
    //Success
    cb(undefined, true);
  },
});

const categoriesRoutes = (app, fs) => {
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
  app.get("/categories", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  // CREATE
  app.post("/categories", (req, res) => {
    readFile((categories) => {
      try {
        const foundCategory = categories.find(
          (category) => req.body.name === category.name
        );
        if (!foundCategory) {
          let newCategory = {
            id: Date.now(),
            name: req.body.name,
            imgUrl: req.body.imgUrl,
          };

          categories.push(newCategory);

          writeFile(JSON.stringify(categories, null, 2), () => {
            return res
              .setHeader("Content-Type", "text/plain")
              .status(200)
              .json(categories);
          });
        } else {
          return res
            .setHeader("Content-Type", "text/plain")
            .status(403)
            .json({ message: "Category already created!" });
        }
      } catch {
        return res.json({ message: "Internal server error" });
      }
    }, true);
  });

  // UPDATE
  app.put("/categories/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const categoryId = req.params["id"];
      data[categoryId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200);
      });
    }, true);
  });

  // UPDATE
  app.patch("/categories/:id", (req, res) => {
    readFile((categories) => {
      const categoryId = req.params["id"];
      categories[categoryId] = req.body;
      writeFile(JSON.stringify(categories, null, 2), () => {
        // res.status(200).send(`category id:${categoryId} updated`);
        return res.setHeader("Content-Type", "text/plain").json(categories);
      });
    }, true);
  });

  // DELETE
  app.delete("/categories/:id", (req, res) => {
    readFile((categories) => {
      writeFile(
        JSON.stringify(
          (categories = categories.filter(
            (category) => Number(category.id) !== Number(req.params.id)
          )),
          null,
          2
        ),
        () => {
          return res
            .status(200)
            .setHeader("Content-Type", "text/plain")
            .json(categories);
        }
      );
    }, true);
  });
};
const dataPathCategories = "./data/categories.json";

module.exports = categoriesRoutes;
