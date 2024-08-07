const Professions = require("../../models/professions/professions");

exports.find = (req, res) => {
  Professions.find((err, professions) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: professions });
  });
};

exports.findById = (req, res) => {
  Professions.findById(req.params.id, (err, professions) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: professions });
  });
};

exports.read = async (req, res) => {
  Professions.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const name = req.body.name;
  const isCritial = req.body.isCritial;

  const professions = new Professions({
    name,
    isCritial,
  });
  professions.save((err, data) => {
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
  Professions.findById(req.params.id).then((request) => {
    request.name = req.body.name;
    request.isCritial = req.body.isCritial;

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
  Professions.findByIdAndDelete(req.params.id)
    .then((professions) => res.json({ data: professions }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
