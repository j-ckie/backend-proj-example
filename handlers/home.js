const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("dotenv").config();

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("index"));

module.exports = router; 