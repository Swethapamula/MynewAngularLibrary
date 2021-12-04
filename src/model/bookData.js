const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@cluster0.f0m8q.mongodb.net/LIBRARYANGULAR?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
  var bookSchema= new Schema({
    bookTitle:String,
    bookAuthor:String,
    genre:String,
    image:String
  })

  var bookData=mongoose.model('book',bookSchema);
  module.exports=bookData;