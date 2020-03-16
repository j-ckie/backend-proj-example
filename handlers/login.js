const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
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
                                req.session.email = persistUser.email;
                                req.session.name = persistUser.name;
                                req.session.id = persistUser.id;
                            }
                            res.redirect("/");
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