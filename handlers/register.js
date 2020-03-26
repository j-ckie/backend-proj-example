const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;


router.use(express.urlencoded());

router.get("/", (req, res) => res.render("register"));

router.post("/", (req, res) => {
    console.log("Step 1 of user creation...")
    let email = req.body.email,
        name = req.body.name,
        password = req.body.password;

    models.Users.findOne({
        where: {
            email: email
        }
    })
        .then(persistUser => {
            if (persistUser) {
                res.status(500).json({ message: "Email already in use" });
            } else {
                console.log("Hashing password...");
                bcrypt.hash(password, SALT_ROUNDS)
                    .then(hash => {
                        let newUser = models.Users.build({
                            name: name,
                            email: email,
                            password: hash
                        })

                        newUser.save().then(() => {
                            res.redirect("/login")
                        }).catch(err => console.error(err))
                    })
            }
        })

})

module.exports = router;