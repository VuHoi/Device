var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var deviceSpendingRouter = require('./routes/deviceSpendingController');
var usersRouter = require('./routes/usersController');
var deviceRouter = require('./routes/deviceController');
var mongoose = require('mongoose');
var dbConfig=require('./models/db');
var passport = require('passport');

mongoose.connect(dbConfig.url,{ useNewUrlParser: true });
var db = mongoose.connection;
var app = express();
// var apiRoutes = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('superSecret', dbConfig.secret);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

deviceSpendingRouter(app);
usersRouter(app);
deviceRouter(app);
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

app.use(session({
    secret: 'workhard',
    resave: true,
    saveUninitialized: false,
    cookie: {  },
    store: new MongoStore({
        mongooseConnection: db
    })
}));


module.exports = app;
