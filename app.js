const createError = require('http-errors');
const express = require('express');
const path = require('path');
var session = require('express-session')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var flash = require('connect-flash');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard-sds-cat',
}))
app.use(flash());

// Rutas
app.use('/',  require('./routes/cartelera'));
app.use('/proximos-estrenos', require('./routes/proximos'));
app.use('/bar', require('./routes/bar'));
app.use('/config', require('./routes/config'));


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

// servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
});


module.exports = app;
