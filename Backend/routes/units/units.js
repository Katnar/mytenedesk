const express = require("express");
const router = express.Router();

const {findPikods, findOgdas, findHativas, findGdods} = require('../../controllers/units/units');

router.get("/find")