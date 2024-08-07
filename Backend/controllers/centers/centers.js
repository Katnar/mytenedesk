const Centers = require("../../models/centers/centers");
const handleBanks = require("../../call_functions/banks/handleBanks");
const { ObjectId } = require("mongodb");

exports.find = (req, res) => {
  Centers.find()
    .then((centers) => res.json({ data: centers }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getUnitsBank = async (req, res) => {
  const start = performance.now();
  const piple = [
    {
      $lookup: {
        from: "hativas",
        localField: "_id",
        foreignField: "centerId",
        as: "hativas",
      },
    },
    {
      $unwind: {
        path: "$hativas",
      },
    },
    {
      $lookup: {
        from: "registerunits",
        localField: "hativas._id",
        foreignField: "hativaId",
        as: "hativas.registerunits",
      },
    },
    {
      $unwind: {
        path: "$hativas.registerunits",
      },
    },
    {
      $group: {
        _id: {
          centerId: "$_id",
          hativaName: "$hativas.name",
          hativaId: "$hativas._id",
          centerName: "$name",
        },
        registerunits: {
          $push: {
            registerunitsId: "$hativas.registerunits._id",
            registerunitsName: "$hativas.registerunits.name",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          centerId: "$_id.centerId",
          centerName: "$_id.centerName",
        },
        hativas: {
          $push: {
            hativaId: "$_id.hativaId",
            hativaName: "$_id.hativaName",
            registerunits: "$registerunits",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        centerId: "$_id.centerId",
        centerName: "$_id.centerName",
        hativas: 1,
      },
    },
  ];

  const result = await Centers.aggregate(piple);

  const centers = {};
  const hativas = {};
  const registerunits = {};
  result.forEach((center) => {
    center.hativas?.forEach((hativa) => {
      hativa.registerunits?.forEach((registerUnit) => {
        registerunits[registerUnit.registerunitsId] = {
          name: registerUnit.registerunitsName,
        };
      });

      let registerUnitArray = [];
      hativa.registerunits.map((regUnit) => {
        registerUnitArray.push(regUnit.registerunitsId);
      });
      hativas[hativa.hativaId] = handleBanks(
        hativas[hativa.hativaId],
        hativa.hativaName,
        "centerId",
        center.centerId,
        "_id",
        registerUnitArray,
        "registerunits"
      );
    });
    centers[center.centerId] = handleBanks(
      centers[center.centerId],
      center.centerName,
      null,
      null,
      "hativaId",
      center.hativas,
      "hativas",
      true,
      null
    );
  });
  const end = performance.now();
  console.log(`time to calc unitsBank ${~~(end - start)} ms`);
  if (!centers || !hativas || !registerunits) {
    res.json({ error: true, error_message: "error" });
  }
  const bankData = { centers, hativas, registerunits };
  res.json({ data: bankData });
};

exports.getUnitsBankByCenter = async (req, res) => {
  const start = performance.now();
  const centerId = new ObjectId(req.params.centerId);
  const piple = [
    {
      $match: {
        _id: centerId,
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "_id",
        foreignField: "centerId",
        as: "hativas",
      },
    },
    {
      $unwind: {
        path: "$hativas",
      },
    },
    {
      $lookup: {
        from: "registerunits",
        localField: "hativas._id",
        foreignField: "_id",
        as: "hativas.registerunits",
      },
    },
    {
      $unwind: {
        path: "$hativas.registerunits",
      },
    },
    {
      $group: {
        _id: {
          centerId: "$_id",
          hativaName: "$hativas.name",
          hativaId: "$hativas._id",
          centerName: "$name",
        },
        registerunits: {
          $push: {
            registerunitsId: "$hativas.registerunits._id",
            registerunitsName: "$hativas.registerunits.name",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          centerId: "$_id.centerId",
          centerName: "$_id.centerName",
        },
        hativas: {
          $push: {
            hativaId: "$_id.hativaId",
            hativaName: "$_id.hativaName",
            registerunits: "$registerunits",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        centerId: "$_id.centerId",
        centerName: "$_id.centerName",
        hativas: 1,
      },
    },
  ];

  const result = await Centers.aggregate(piple);
  const centers = {};
  const hativas = {};
  const registerunits = {};
  result.forEach((center) => {
    center.hativas?.forEach((hativa) => {
      hativa.registerunits?.forEach((registerUnit) => {
        registerunits[registerUnit.registerunitsId] = {
          name: registerUnit.registerunitsName,
        };
      });

      let registerUnitArray = [];
      hativa.registerunits.map((regUnit) => {
        registerUnitArray.push(regUnit.registerunitsId);
      });
      hativas[hativa.hativaId] = handleBanks(
        hativas[hativa.hativaId],
        hativa.hativaName,
        "centerId",
        center.centerId,
        "_id",
        registerUnitArray,
        "registerunits"
      );
    });
    centers[center.centerId] = handleBanks(
      centers[center.centerId],
      center.centerName,
      null,
      null,
      "hativaId",
      center.hativas,
      "hativas",
      true,
      null
    );
  });
  const end = performance.now();
  console.log(`time to calc unitsBank ${~~(end - start)} ms`);
  if (!centers || !hativas || !registerunits) {
    res.json({ error: true, error_message: "error" });
  }
  const bankData = { centers, hativas, registerunits };
  res.json({ data: bankData });
};

exports.findById = (req, res) => {
  Centers.findById(req.params.id, (err, centers) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: centers });
  });
};

exports.read = async (req, res) => {
  Centers.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  const name = req.body.name;

  const centers = new Centers({
    name,
  });
  centers.save((err, data) => {
    if (err) {
      console.log("error is: ");
      console.log(err);
      return res
        .status(400)
        .json({ error: true, error_message: "Error: " + err });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Centers.findById(req.params.id).then((request) => {
    request.name = req.body.name;

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
  Centers.findByIdAndDelete(req.params.id)
    .then((centers) => res.json({ data: centers }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
