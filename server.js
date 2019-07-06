var express = require('express');
var app = express();

const port = process.env.PORT || 8080

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database');
mongoose.connect(configDB.url,{useNewUrlParser:true});

require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret : 'AnyString',
    saveUninitialized : true,
    resave : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.set('view engine', 'ejs');

require('./app/routes')(app,passport);

app.listen(port);
console.log("server started on port " + port);
