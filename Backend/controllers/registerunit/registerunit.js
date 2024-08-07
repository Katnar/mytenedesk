const RegisterUnits = require("../../models/registerunit/registerunit");

exports.find = (req, res) => {
  RegisterUnits.find((err, registerunits) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: registerunits });
  });
};

exports.findById = (req, res) => {
  RegisterUnits.findById(req.params.id, (err, registerunits) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: registerunits });
  });
};

exports.read = async (req, res) => {
  RegisterUnits.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const name = req.body.name;
  const hativaId = req.body.hativaId;

  const registerunits = new RegisterUnits({
    name,
    hativaId,
  });
  registerunits.save((err, data) => {
    if (err) {
      console.log("error is: ");
      console.log(err);
      return res
        .status(400)
        .json({ error: true, error_message: "Error: " + err });
    }
    res.json({ data: data });
  });
};

exports.update = (req, res) => {
  RegisterUnits.findById(req.params.id).then((request) => {
    request.name = req.body.name;
    request.hativaId = req.body.hativaId;

    request.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: "Error: " + err });
      }
      res.json({ data: data });
    });
  });
};

exports.remove = (req, res) => {
  RegisterUnits.findByIdAndDelete(req.params.id)
    .then((registerunits) => res.json({ data: registerunits }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
