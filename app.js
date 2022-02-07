const express = require("express");
const app = express();
const ejs = require("ejs");

// TEMPLATE ENGINE
app.set("view engine", "ejs"); // this gets the files in views folder
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/photo", (req, res) => {
  res.render("photo");
});

// LISTEN PORT
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
