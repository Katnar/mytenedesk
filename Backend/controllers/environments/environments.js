const { request } = require("express");
const Environments = require("../../models/environments/environments");

exports.find = (req, res) => {
  Environments.find((err, environments) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ error: false, error_message:"", data: environments });
  });
};

exports.findById = (req, res) => {
  Environments.findById(req.params.id, (err, environments) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: environments });
  });
};

exports.read = async (req, res) => {
  Environments.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = async (req, res) => {
  const name = req.body.name;
  const reality = req.body.reality;
  let codeData = await Environments.find();
  let code = Number(codeData.length + 1);
  if (code < 10) {
    code = `000${code}`;
  } else if (code >= 10 && code < 100) {
    code = `00${code}`;
  } else if (code >= 100 && code < 1000) {
    code = `0${code}`;
  }
  // const findCode = await Environments.findOne({ code: code })
  //   .then((reqCode) => {
  //     return reqCode;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
  // if (findCode && findCode.code === code) {

  // }
  // console.log(findCode);
  const environments = new Environments({
    name,
    reality,
    code,
  });
  environments.save((err, data) => {
    if (err) {
      console.log("error is: ");
      console.log(err);
      return res
        .status(400)
        .json({ error: true, error_message: "Error: " + err });
    }
    res.json({ error: false, error_message:data.code, data: data });
  });
};

exports.update = (req, res) => {
  Environments.findById(req.params.id).then((request) => {
    request.name = req.body.name;
    request.reality = req.body.reality;
    request.code = req.body.code;

    request.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: "Error: " + err });
      }
      res.json({ error: false, error_message:"", data: data });
    });
  });
};

exports.remove = (req, res) => {
  Environments.findByIdAndDelete(req.params.environmentId)
    .then((environments) => res.json({ error: false, error_message: "", data: environments }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
