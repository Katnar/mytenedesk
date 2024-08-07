const Occupations = require("../../models/occupations/occupations");

exports.find = (req, res) => {
  Occupations.find((err, occupations) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: occupations });
  });
};

exports.findById = (req, res) => {
  Occupations.findById(req.params.id, (err, occupations) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: occupations });
  });
};

exports.read = async (req, res) => {
  Occupations.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const professionCode = req.body.professionCode;
  const description = req.body.description;
  const isCritical = req.body.isCritical;

  const occupations = new Occupations({
    professionCode,
    description,
    isCritical,
  });
  occupations.save((err, data) => {
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
  Occupations.findById(req.params.id).then((request) => {
    request.f = req.body.professionCode;
    request.description = req.body.description;
    request.isCritical = req.body.isCritical;

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
  Occupations.findByIdAndDelete(req.params.id)
    .then((occupations) => res.json({ data: occupations }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
