const Pikod = require('../../models/units/pikod');
const Ogda = require('../../models/units/ogda');
const Hativa = require('../../models/units/hativa');
const Gdod = require("../../models/units/gdod");

exports.findPikods = (req, res) => {
    Pikod.find((err, pikod) => {
        if (err) res.send(err);
        res.json(pikod);
      });
}

exports.findOgdas = (req, res) => {
    Ogda.find((err, ogda) => {
        if (err) res.send(err);
        res.json(ogda);
      });
}

exports.findHativas = (req, res) => {
    Hativa.find((err, hativa) => {
        if (err) res.send(err);
        res.json(hativa);
      });
}

exports.findGdods = (req, res) => {
    Gdod.find((err, gdod) => {
        if (err) res.send(err);
        res.json(gdod);
      });
}

