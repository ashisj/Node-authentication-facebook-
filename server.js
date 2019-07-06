var express = require('express');
var app = express();

const port = process.env.PORT || 8080

var morgan = require('morgan');

app.use(morgan('dev'));

app.use('/',(req,res) => {
    res.send("Hello world")
})

app.listen(port);
console.log("server staerte on port " + port);
