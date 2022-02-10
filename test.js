const mongoose = require("mongoose"); // imported mongoose
const Schema = mongoose.Schema; // made a schema

// connect mongoose with a database
mongoose.connect("mongodb://localhost//pcat-test-db");

// create schema
const PhotoSchema = new Schema({});
