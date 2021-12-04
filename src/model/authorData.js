const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@cluster0.f0m8q.mongodb.net/LIBRARYANGULAR?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
  var authorSchema= new Schema({
    authorName:String,
    famousBook:String,
    nationality:String,
    image:String
  })

  var authorData=mongoose.model('author',authorSchema);
  module.exports=authorData;