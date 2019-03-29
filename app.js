var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var {
  auth
} = require('./middleware/auth_middleware');
var config = require('./config');

var productsRouter = require('./routes/products');
const {
  middleware
} = require('./middleware/middleware');


var app = express();
var hash = require('object-hash');


app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(middleware);
// app.use('/categories', auth);
app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/getHash', function (req, res) {

  var headervalue = config.header.value;

  var data = {
    key: headervalue,
    params: req.body,
    url: req.headers.url
  };
  var hashed = hash.MD5(data);
  console.log('Hash is', hashed);
  res.send(hashed);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;