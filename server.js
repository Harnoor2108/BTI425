/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Harnoor Kaur Student ID:156624215    Date: 22-January-2023
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/


var express = require("express");
var cors = require("cors");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }

  db.initialize("mongodb+srv://Harnoor:ABCD1234@cluster0.w0ezaoo.mongodb.net/sample_mflix?retryWrites=true&w=majority").then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });
   
  //MIDDLEWARE FUNCTION

  app.use(cors());
  require('dotenv').config();
  app.use(express.json());


  //ROUTES

  app.get("/", function(req,res){
    //res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
    var obj = {message: "API Listening"};
    res.json(obj);
});

app.post("/api/movies" , async(req,res) => {

  db.addNewMovie(req.body)
  .then(function() {
    res.status(201).json(res.body);
  })
  .catch((err) => {
    res.status(404).json(err);
  })

  
});

app.get("/api/movies" , async(req,res) => {

  db.getAllMovies(req.query.page , req.query.perPage, req.query.title)
  .then((movies) => {
    res.status(200).json(movies);
  })
  .catch((err) => {
res.status(404).json(err);

  }) 
})

app.get("/api/movies/:id" , async(req,res) => {
db.getMovieById(req.params.id)
.then((movies) => {
  res.status(200).json(movies);
})
.catch((err) => {
  res.status(404).json(err);
}) 

});

app.put("/api/movies/:id" , async(req,res) => {

db. updateMovieById(req.body , req.params.id)
.then(()=> {
  res.json({message : `Updated`});
})
.catch((err) => {
  res.status(404).json(err);
})

});

app.delete("/api/movies/:id" , async(req, res) => {

  db.deleteMovieById(req.params.id)
  .then(()=> {
    res.status(200).json('deleted');
  })
  .catch((err) => {
    res.status(404).json(err);
  })

});


//app.listen(HTTP_PORT, onHttpStart);