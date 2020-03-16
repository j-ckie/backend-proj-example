const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser")
// const models = require("./models");
// const VIEWS_PATH = path.join(__dirname, "/views")

const register = require("./handlers/register");
const login = require("./handlers/login");

// set the view engine to ejs
app.set('view engine', 'ejs');

// set paths to run
app.use(express.static(path.join(__dirname, "public")))


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// use res.render to load up an ejs view file
// index page 
app.get('/', (req, res) => res.render('pages/index'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/register', (req, res) => res.render('pages/register'));
app.get('/login', (req, res) => res.render('pages/login'));

app.use("/register", register);
app.use("/login", login);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT} successfully`)
})
