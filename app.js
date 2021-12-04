const express= require('express');
const app= new express();
const path=require('path');

const  cors =require("cors");
const jwt = require("jsonwebtoken");
const port= process.env.PORT || 3050;
 var authorsData =require("./src/model/authorData");
 var booksData =require("./src/model/bookData");
 var userData=require('./src/model/userData');
app.use(express.static('./dist/FrontEnd'));
 app.use(express.json());

app.use(cors());

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/FrontEnd/index.html'));
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }


app.post('/api/signup', function(req,res){

    var user={
        uname:req.body.user.uname,
        email:req.body.user.email,
        psw:req.body.user.psw
    
    }

    var signup =new userData(user);
    signup.save()

    res.send();
})


app.post('/api/login', (req, res) => {
   let userData = req.body
   username=userData.uname;
   password=userData.pwd;

if (!username)    
{
    console.log(username);
    res.status(401).send('Invalid Username')
} 
else if(!password) 
{
    console.log(username);
    res.status(401).send('Invalid Password')
}
else if (username=='admin'&& password=='12345')
{
    let payload = {subject: username+password}
    let token = jwt.sign(payload, 'secretKey')
    let role="admin";
    res.status(200).send({ token,"role":role})
}
else{
    let payload = {subject: username+password}
    let token = jwt.sign(payload, 'secretKey')
    let role="user";
    res.status(200).send({token,"role":role})
}
    })

    
app.post("/api/authorinsert", verifyToken,function(req,res){
    console.log(req.body)
    var author={
        authorName:req.body.author.authorName,
        famousBook:req.body.author.famousBook,
        nationality:req.body.author.nationality,
        image:req.body.author.image
    }
    console.log(author);
    var author=new authorsData(author)
    author.save();
})

app.post("/api/bookinsert",verifyToken, function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    var book={
        bookTitle:req.body.book.bookTitle,
        bookAuthor:req.body.book.bookAuthor,
        genre:req.body.book.genre,
        image:req.body.book.image
    }
    var book=new booksData(book)
    book.save();
})

app.get('/api/books',verifyToken,function(req,res){
    
    booksData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/authors',verifyToken, function(req,res){

    authorsData.find()
    .then(function(authors)
    {
        res.send(authors);
    })
})

app.delete('/api/authordelete/:id',verifyToken,function(req,res){

  let id= req.params.id;
    authorsData.findByIdAndRemove({"_id":id})
    .then(()=>
    { console.log("Success");
        res.send()
    })
})

app.delete("/api/bookdelete/:id",verifyToken, function(req,res){
    let id =req.params.id;
    booksData.findByIdAndRemove({"_id":id})
    .then(()=>{
        console.log("Deleted book successsfully");
        res.send();
    })

})

app.get('/api/author/:id',verifyToken, function(req,res){
    let id= req.params.id;
    authorsData.find({"_id":id})
    .then(function(author){
        console.log(author);
        res.send(author);
    })

})

app.get('/api/book/:id',verifyToken, function(req,res){
    let id= req.params.id;
    
    booksData.find({"_id":id})
    .then(function(book){
        res.send(book);
    })

})
app.put("/api/bookupdate",verifyToken, function(req,res)
{
    id=req.body.book[0]._id;
    bookTitle=req.body.book[0].bookTitle;
    bookAuthor=req.body.book[0].bookAuthor;
    genre=req.body.book[0].genre;
    image=req.body.book[0].image;

  booksData.findByIdAndUpdate({"_id":id},{$set:{
       "bookTitle":bookTitle,
       "bookAuthor":bookAuthor,
       "genre":genre,
       "image":image

  }}).then(()=>{console.log("Success")
  res.send();

 })
  

});


app.put("/api/editauthor", verifyToken,function(req,res)
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    console.log(req.body.author[0])
    id=req.body.author[0]._id;
    authorName=req.body.author[0].authorName;
    famousBook=req.body.author[0].famousBook;
    nationality=req.body.author[0].nationality;
    image=req.body.author[0].image;
    authorsData.findByIdAndUpdate({"_id":id},{$set:{
       "authorName":authorName,
       "famousBook":famousBook,
       "nationality":nationality,
       "image":image

  }}).then(()=>{console.log("Success")
  res.send();

 })
  

});



app.listen(port,()=>{console.log("Server ready at port" +port)});


