var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.MONGO;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookingRouter = require('./routes/book');


var app = express();

// middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/logo.jpg', express.static('public/images/logo/logo_bigger_black.jpg'));
app.use('/favicon.png', express.static('public/images/logo/logo_white.png'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);

// Conenct to mongodb
const connect = async () =>{
  try {
      
      await mongoose.connect(mongodbURL);
      console.log("Connected to mongoDB.");
  } catch (error){
      throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
  console.log("mongoDB disconnected!");
});
const db = mongoose.connection;

app.listen(8800, ()=>{
  connect()
  console.log("Connected to backend.");
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;