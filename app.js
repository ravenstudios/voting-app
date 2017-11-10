var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var Strategy = require("passport-twitter").Strategy;
var session = require("express-session");


var shapes = require('./graph');







passport.use(new Strategy({
  consumerKey: "6h2oekA9P20AWnymuZbxP6Ngo",
  consumerSecret: "ojtAZD4SdbMqnJ7tY7PZnLjQzwA0xIifo08qyOErqEAo1S4V28",
  callbackURL: "http://localhost:3000/twitter/return"
}, function(token, tokenSecret, profile, callback){
  return callback(null, profile);
}));

passport.serializeUser(function(user, callback){
  callback(null, user);
});

passport.deserializeUser(function(obj, callback){
  callback(null, obj);
});

// var index = require('./routes/index');
// var users = require('./routes/users');
// var test = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
// app.use('/', index);
// app.use('/users', users);
// app.use("/test", test);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(session({secret: "whatever", resave: true, saveUninitialized: true}));

app.get("/", function(req, res){

  res.render("index");
});


app.get("/test", function(req, res){

  res.render("index");
});


// app.get("/login", function(req, res){
//   res.send("login")
// });
app.get("/twitter/login", passport.authenticate("twitter"));
app.get("/twitter/return", passport.authenticate("twitter", {
  failureRedirect: "/"
}), function(req, res){

  res.render("index", {user: req.user});
})
module.exports = app;
