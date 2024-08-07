const Frames = require("../../models/frames/frames");

exports.find = (req, res) => {
  Frames.find((err, frames) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: frames });
  });
};

exports.findById = (req, res) => {
  Frames.findById(req.params.id, (err, frames) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: frames });
  });
};

exports.read = async (req, res) => {
  Frames.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const name = req.body.name;
  const centerId = req.body.centerId;

  const frames = new Frames({
    name,
    centerId,
  });
  frames.save((err, data) => {
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
  Frames.findById(req.params.id).then((request) => {
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
  Frames.findByIdAndDelete(req.params.id)
    .then((frames) => res.json({ data: frames }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
