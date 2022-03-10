const express = require("express");
const app = express();
const ejs = require("ejs");

// TEMPLATE ENGINE
app.set("view engine", "ejs"); // this gets the files in views folder

// Middlewares
/* this gets static files in public folder also  express.static() is a middleware function */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  // render method renders index.ejs file
  res.render("index");
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
app.post("/photos", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// LISTEN PORT
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
