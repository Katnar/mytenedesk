const Refrence = require("../../models/refrence/refrence");

exports.find = (req, res) => {
  Refrence.find((err, refrence) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: refrence });
  });
};

exports.findById = (req, res) => {
  Refrence.findById(req.params.id, (err, refrence) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: refrence });
  });
};

exports.read = async (req, res) => {
  Refrence.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const code = req.body.code;
  const description = req.body.description;
  const center = req.body.center;
  const location = req.body.location;
  const contact = req.body.contact;
  const contactPhone = req.body.contactPhone;

  const refrence = new Refrence({
    code,
    description,
    center,
    location,
    contact,
    contactPhone,
  });
  refrence.save((err, data) => {
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
  Refrence.findById(req.params.id).then((request) => {
    request.code = req.body.code;
    request.description = req.body.description;
    request.center = req.body.center;
    request.location = req.body.location;
    request.contact = req.body.contact;
    request.contactPhone = req.body.contactPhone;

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
  Refrence.findByIdAndDelete(req.params.id)
    .then((refrence) => res.json({ data: refrence }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
