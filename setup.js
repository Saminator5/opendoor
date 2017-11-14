/*
1)  npm init
2)  install packages
3)  boiler:

BOILER from past project:

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

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

app.use('/listings', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('err ', err);
});

app.set('PORT', process.env.PORT || 3000);
app.listen(app.get('PORT'), () => {
  console.log(`Server for OpenDoor running on port ${app.get('PORT')}!`);
});

module.exports = app;

4)  Create routes using var router = express.Router();
5)  Have npm start run app.js.  nodemon app.js
6)  install --save necessary packages.
7)  you're setup :D
