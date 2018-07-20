var mongoose = require("mongoose");

mongoose.connect(process.env.COMPOSE_URL);

var bookSchema = new mongoose.Schema({  
  title: String,
  author: String,
  description: String
});

var Book = mongoose.model("Book", bookSchema);
