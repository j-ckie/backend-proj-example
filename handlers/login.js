const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("dotenv").config();

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    console.log("logging in user... ")
    let email = req.body.email,
        password = req.body.password;

    models.Users.findOne({
        where: {
            email: email
        }
    })
        .then(persistUser => {
            if (persistUser) {
                bcrypt.compare(password, persistUser.password)
                    .then(success => {
                        if (success) {
                            if (req.session) {
                                req.session.email = email;
                                req.session.name = persistUser.name;
                            }
                            // res.redirect("/");
                            // res.status(200).json({message: "It WORKS!!!!!!!!!!!"})
                            res.status(200).redirect("/dashboard")
                        } else {
                            res.render("login", { message: "invalid information" });
                        }
                    })
            } else {
                let invalidLogin = "Invalid login attempt";
                res.status(500).json({ message: invalidLogin });
            }
        })
})

module.exports = router;