var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var dealsRouter  =require ('./routes/deals');
var productsRouter = require('./routes/products');
var banksRouter = require('./routes/banks');
var branchRouter = require('./routes/branch');
var reviewRouter = require('./routes/review');
var metaRouter = require('./routes/coinsmetadata');
var ratesRouter = require('./routes/coinrates');
var deviceRouter = require('./routes/userDevice');
var notifyRouter = require('./routes/notifications');
var viewsRouter = require ('./routes/views');


var {
  auth
} = require('./middleware/auth_middleware');
var config = require('./config');


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
app.use('/categories', auth);
app.use('/deals', auth);
app.use('/products', auth);
app.use('/banks', auth);
app.use('/branch', auth);
app.use('/users/follow', auth);
app.use('/users/unfollow', auth);
app.use('/review/add', auth);
app.use('/users/update', auth);
app.use('/users/updatecoins',auth);
app.use('/users/getcoins',auth);
app.use('/device',auth);
app.use('/notifications',auth);





app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/deals',dealsRouter);
app.use('/banks', banksRouter);
app.use('/branch', branchRouter);
app.use('/review', reviewRouter);
app.use('/coinsmetadata',metaRouter);
app.use('/coinrates',ratesRouter);
app.use('/device',deviceRouter);
app.use('/notifications',notifyRouter);
app.use('/views', viewsRouter);


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