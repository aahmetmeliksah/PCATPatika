const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const app = express();

const Photo = require("./models/Photo.js");

// CONNECT DB
mongoose.connect("mongodb://localhost/photosDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set("view engine", "ejs"); // this gets the files in views folder
// ejs goes through the views folder and looks for files with .ejs extension
//

// Middlewares
/* this gets static files in public folder also  express.static() is a middleware function */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated"); // use sort put
  // render method renders index.ejs file
  res.render("index", {
    photos,
  });
});

// get single item
app.get("/photos/:id", async (req, res) => {
  // console.log(req.params);
  const photo = await Photo.findById(req.params.id);
  res.render("photos", {
    photo,
  });
});

app.get("/about", (req, res) => {
  // renders about.ejs file
  res.render("about");
});

app.get("/add", (req, res) => {
  // renders add.ejs file
  res.render("add");
});

app.get("/photos", (req, res) => {
  // renders photo.ejs file
  res.render("photos");
});

// post photo from add page
app.post("/photos", async (req, res) => {
  // console.log(req.files.image);

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let image = req.files.image;
  let imagePath = `${__dirname}/public/uploads/${image.name}`;

  image.mv(imagePath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + image.name,
    });
    res.redirect("/");
  });
});

// LISTEN PORT
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
