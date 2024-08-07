const Hativas = require("../../models/hativas/hativas");

exports.find = (req, res) => {
  Hativas.find((err, hativas) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: hativas });
  });
};

exports.findById = (req, res) => {
  Hativas.findById(req.params.id, (err, hativas) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: hativas });
  });
};

exports.read = async (req, res) => {
  Hativas.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const name = req.body.name;
  const centerId = req.body.centerId;

  const hativas = new Hativas({
    name,
    centerId,
  });
  hativas.save((err, data) => {
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
  Hativas.findById(req.params.id).then((request) => {
    request.name = req.body.name;
    request.centerId = req.body.centerId;

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
  Hativas.findByIdAndDelete(req.params.id)
    .then((hativas) => res.json({ data: hativas }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
