const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser")
const session = require("express-session");
const cookieParser = require("cookie-parser")

const axios = require("axios");

// initialize and use .env file (THIS STORES YOUR SESSION SECRET!!)
require("dotenv").config();

// register handler
const register = require("./handlers/register");
// login handler
const login = require("./handlers/login");


// set the view engine to ejs
app.set('view engine', 'ejs');

// set paths to run
app.use(express.static(path.join(__dirname, "public")))

// CORS middleware to allow access from front end
app.use(cors());

// session setup
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET, // uses the session secret which is saved to a .env file that is ignored on the .gitignore file
    cookie: {
        maxAge: 24 * 1000 * 60 * 60, 
        secure: false
    }
}))

// body-parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// AUTHENTICATED MIDDLEWARE! Use this to protect specific routes!
function authenticate(req, res, next) {
    if (req.session) { // if a session exists
        if (req.session.email) { // if the session has the email information
            next() // let the rest of the functionality run
        } else { // if the session does NOT have the email information
            res.redirect("/login")  // redirect to the login page
        }
    } else { // if the session does NOT exist
        res.redirect("/login") // redirect to the login page
    }
}

// use res.render to load up an ejs view file
// index page 
app.get('/', (req, res) => {
    console.log(req.session.name)
    res.render('pages/index', {
        confirmed: req.session.email, // passes the session email information to the EJS file! We will use this to create conditional navbars based on session state!
        name: req.session.name
    })
});

// about page
app.get('/about', (req, res) => res.render('pages/about', {
    confirmed: req.session.email,
    name: req.session.name
}));

// register page
app.get('/register', (req, res) => res.render('pages/register', {
    confirmed: req.session.email,
    name: req.session.name
}));

// login page
app.get('/login', (req, res) => {
    console.log(req.session)
    res.render('pages/login', {
        confirmed: req.session.email,
        name: req.session.name
    })
});

app.get('/dashboard', authenticate, (req, res) => {
    res.render('pages/dashboard', {
        confirmed: req.session.email,
        name: req.session.name
    })
})

// example of protecting a route
app.get("/test", authenticate, (req, res) => { // adding 'authenticate' between the path and anon function protects this route!
    res.render("pages/test", {
        confirmed: req.session.email,
        name: req.session.name
    })
})

// trigger the 'register' functionality 
app.use("/register", register);

// trigger the 'register' functionality 
app.use("/login", login);

app.get("/logout", authenticate, (req, res) => { // on 'logout'
    req.session.destroy(); // delete the session stored in the cookie
    res.redirect("/") // then redirect to the homepage
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT} successfully`)
})
