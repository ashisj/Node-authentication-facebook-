var express = require('express');
var app = express();

const port = process.env.PORT || 8080

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret : 'AnyString',
    saveUninitialized : true,
    resave : true
}));

app.use('/',(req,res) => {
    res.send("Hello world");
    console.log(req.cookies);
    console.log("============");
    console.log(req.session);
});

app.listen(port);
console.log("server started on port " + port);
