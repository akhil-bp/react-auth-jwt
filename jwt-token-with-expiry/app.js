var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejwt = require('express-jwt');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')
var app = express();
const mongoDbUrl = 'mongodb://localhost/react_jwt'
var mongoose = require('mongoose');
mongoose
    .connect(mongoDbUrl,{ useNewUrlParser: true })
  .then(() => {
    console.log("mongodb successfully connected");
  })
  .catch(err => {
    console.log(err);
  });
const TW_JWTSECRET = process.env.TW_JWTSECRET;
const TW_SITEURL   = process.env.TW_SITEURL;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/authenticate', usersRouter);
app.use('/api', ejwt({ 
  secret: "TW_JWTSECRET",
  // audience: [1,2,3,4,5],
  algorithm: 'HS256',
  issuer: TW_SITEURL
}).unless({path: ['/api/authenticate', '/api/update-video-process']}), indexRouter);

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
