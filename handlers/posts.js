const models = require("../models");
const express = require("express");
const app = express();
const router = express.Router();

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("dashboard"));

