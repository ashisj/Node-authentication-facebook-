var express = require('express');
var app = express();

const port = process.env.PORT || 8080

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var configDB = require('./config/database');
mongoose.connect(configDB.url,{useNewUrlParser:true});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret : 'AnyString',
    saveUninitialized : true,
    resave : true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

/*
app.use('/',(req,res) => {
    res.send("Hello world");
    console.log(req.cookies);
    console.log("============");
    console.log(req.session);
});
*/

require('./app/routes')(app);

app.listen(port);
console.log("server started on port " + port);
