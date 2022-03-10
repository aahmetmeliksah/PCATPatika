const mongoose = require("mongoose");
const Schema = mongoose.Schema();

// connect to a database || if such database doesn't exist mongoose will create
mongoose.connect("mongodb://localhost/pcat-test-db");

// here we create a new shcema object that has title and desc keyfields and their values will be strings
const PhotoSchema = new mongoose.Schema({
  title: String,
  desc: String,
});

/* model the schema and give it to the photo variable. First argument is the name of the collection and the second one is the the shcema itself */
const Photo = mongoose.model("Photo", PhotoSchema);

/* create a photo based on the PhotoSchema and as you can see it has title and desc keyfields and their values are strings */
// Photo.create({
//   title: "photo 2",
//   desc: "desc 2",
// });

/* read documents (in this case photo)
 the first argument is for if there're any requirements to that are being looked for in the document. The second argument is a callback function that takes err and data as arguments. This time we logged data in the console that's why we will see the data document on the console */
// Photo.find({}, (err, data) => console.log(data));

// -------------------------------------------------------------------

/* update documents | findOneAndUpdate method updates the first document that meets the requirements and updates it */

// const id = "622914535d41b07e41bbbc28";
// Photo.findOneAndUpdate(
//   id,
//   {
//     new: true,
//   },
//   {
//     title: "photo 1 title updated again",
//     desc: "photo 1 desc updated again",
//   },
//   (err, data) => console.log(data)
// );

/* first parameter takes the id of the document that is going to be updated. The second argument is what is going to be updated and the third one is a callback function that takes err and data as parameters. Data is the document itself */

// --------------------------------------------------------------------------
const id = "622914535d41b07e41bbbc28";

Photo.findByIdAndDelete(id, (err, data) =>
  console.log(`document with id ${id} deleted`)
);
