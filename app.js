const express = require("express");
const app = express();
const path = require("path");

/*// MIDDLEWARE FUNC  (Everything that is in between req and res objects are MIDDLEWARES)
const myLogger = (req, res, next) => {
  console.log("Middleware log 1");
  next(); // Use next() func to move on to the next middleware
};
*/

app.use(express.static("public"));
/*/// MIDDLEWARES
app.use(myLogger);
*/

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
