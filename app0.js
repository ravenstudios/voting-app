var express = require("express");
var path = require("path");
var getQueryDatabase = require("./getQueryDatabase");
var saveQuery = require("./saveQuery");
var imageSearch = require("./imageSearch");

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get("/api/imagesearch/:searchTerm", function(req, res){
  var offset = req.query.offset;
  var query = req.params.searchTerm;
  imageSearch(query, offset, function(result){
    saveQuery(query, function(result){

    })
    res.send(result);
  });

  //res.send("image search " + req.params.query + " " + req.query);
  //res.render("index")
})

app.get("/api/latest/imagesearch", function(req, res){
  getQueryDatabase(function(result){
    res.send(result);
  })
})

app.get("/", function(req, res){
  res.render("index")
})

app.listen(3000, function(){
  console.log("server started");
})
