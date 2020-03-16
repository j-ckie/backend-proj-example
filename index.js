// server.js
// load the things we need
var express = require('express');
var app = express();

var path = require('path')

// set the view engine to ejs
app.set('view engine', 'ejs');

// set paths to run
app.use(express.static(path.join(__dirname, "public")))

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');