const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser")
const session = require("express-session");
const cookieParser = require("cookie-parser")
require("dotenv").config();
// const models = require("./models");
// const VIEWS_PATH = path.join(__dirname, "/views")

const register = require("./handlers/register");
const login = require("./handlers/login");


// set the view engine to ejs
app.set('view engine', 'ejs');

// set paths to run
app.use(express.static(path.join(__dirname, "public")))

app.use(cors());

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000,
        secure: false
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



function authenticate(req, res, next) {
    // console.log("====AUTHENTICATE====")
    // console.log(req.session)
    if (req.session) {
        if (req.session.email) {
            next()
        } else {
            // console.log("no req.session.email")
            res.redirect("/login")
        }
    } else {
        // console.log("no req.session")
        res.redirect("/login")
    }
}

// use res.render to load up an ejs view file
// index page 
app.get('/', (req, res) => {
    res.render('pages/index', {
        confirmed: req.session.email
    })
});
app.get('/about', (req, res) => res.render('pages/about', {
    confirmed: req.session.email
}));
app.get('/register', (req, res) => res.render('pages/register', {
    confirmed: req.session.email
}));
app.get('/login', (req, res) => {
    console.log(req.session)
    res.render('pages/login', {
        confirmed: req.session.email
    })
});

app.get("/test", authenticate, (req, res) => {
    console.log(req);
    res.render("pages/test", {
        confirmed: req.session.email
    })
})

app.use("/register", register);
app.use("/login", login);
app.get("/logout", authenticate, (req, res) => {
    req.session.destroy();
    res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT} successfully`)
})
