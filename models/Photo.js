const mongoose = require("mongoose"); // ES6 import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

// mongoose.connect("mongodb://localhost/photosDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//
//

// Photo.create({
//   title: "Photo 13",
//   desc: "Desc 13",
// });

// Read Data
// Photo.find({ title: "Photo 13" }, (err, photo) => {
//   console.log(photo);
// });

module.exports = Photo;
