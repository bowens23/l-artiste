// Dependencies
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

// Route Files
let index = require('./routes/index');
let artist = require('./routes/artist');
let artwork = require('./routes/artwork');
let login = require('./routes/login');
let logout = require('./routes/logout');
let signup = require('./routes/signup');
let search = require('./routes/search');
let order = require('./routes/order')


// Models
let db = require('./models');

// Initialize App
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Authentication
let authentication = require('./authentication/passport')(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Global Variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('sucess_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next()
});

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', index);
app.use('/artists', artist);
app.use('/artworks', artwork);
app.use('/search', search);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/cart', order);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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


db.sequelize.sync(
  //{ force: true}
);

module.exports = app;
