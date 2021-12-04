const mongoose= require('mongoose');
const { schema } = require('./authorData');
mongoose.connect("mongodb+srv://userone:userone@cluster0.f0m8q.mongodb.net/LIBRARYANGULAR?retryWrites=true&w=majority");
const Schema= mongoose.Schema;
var  signupschema = new Schema(
    {
    uname:String,
    email:String,
    psw:String

    }
)
 var signupData = mongoose.model("userDetails",signupschema);
 module.exports=signupData;


