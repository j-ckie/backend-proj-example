// server.js
// load the things we need

let express = require('express');
let app = express();

let path = require('path')

let PORT = process.env.PORT || 8080

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

app.post('/login', (req, res) => {
    res.send("Logging in...")
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT} successfully`)
})
