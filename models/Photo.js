const mongoose = require("mongoose"); // ES6 import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/photosDB");

const PhotoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

Photo.create({
  title: "Photo 1",
  desc: "Desc 1",
});

module.exports = Photo;
