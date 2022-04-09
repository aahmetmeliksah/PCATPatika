const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

// ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated"); // use sort put
  // render method renders index.ejs file
  res.render("index", {
    photos,
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

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  // renders edit.ejs file
  res.render("edit", {
    photo,
  });
});

// update photo
app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.desc = req.body.desc;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

app.get("/photos", (req, res) => {
  // renders photo.ejs file
  // res.render("photos");
  res
    .status(404)
    .send(
      "<a href='/' style='text-decoration: none; color: #663399;'><h3 style='font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100%;'>PLEASE CLICK ANYWHERE ON THIS PAGE TO GO BACK TO HOME PAGE, AFTER THAT CLICK ON A RANDOM ITEM</h3></a>"
    );
});

// get single photo
app.get("/photos/:id", async (req, res) => {
  // console.log(req.params);
  const photo = await Photo.findById(req.params.id);
  res.render("photos", {
    photo,
  });
});

// post photo from add page
app.post("/photos", async (req, res) => {
  // console.log(req.files.image);

  // path to upload
  const uploadDir = "public/uploads";

  // check if such file exists, otherwise create it
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // getting image information with req.files.image -> you assigned name=image on the form
  let image = req.files.image;
  // getting the path
  let imagePath = `${__dirname}/public/uploads/${image.name}`;

  // moving neccessary information into imagePath and giving the needed data through create()
  image.mv(imagePath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + image.name,
    });

    // after adding new photo, redirect to home page
    res.redirect("/");
  });
});

// LISTEN PORT
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
