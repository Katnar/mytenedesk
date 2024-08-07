const { ObjectId } = require("mongodb");
const Arenas = require("../../models/arenas/arenas");
const handleBanks = require("../../call_functions/banks/handleBanks");

exports.find = (req, res) => {
  Arenas.find((err, arenas) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: arenas });
  });
};

exports.getAllCentersInArenas = (req, res) => {
  const piple = [
    {
      $unwind: "$units", // Assuming arrayField contains the values to match
    },
    {
      $lookup: {
        from: "centers",
        let: {
          valueToMatch: "$units",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$valueToMatch"],
              },
            },
          },
        ],
        as: "centersArray",
      },
    },
    {
      $unwind: "$centersArray",
    },
    {
      $group: {
        _id: "$_id",
        unitsArray: {
          $push: "$centersArray.name",
        },
      },
    },
    // {
    //   $project: {
    //     concatenatedString: {
    //       $reduce: {
    //         input: "$unitsArray ",
    //         initialValue: "",
    //         in: { $concat: ["$$value", ",", { $toString: "$$this" }] }
    //       }
    //     }
    //   }
    // }
  ];
  Arenas.aggregate(piple)
    .then((arenas) => {
      res.json({ data: arenas });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
  // Arenas.find((err, arenas) => {
  //   if (err)
  //     res.status(400).json({ error: true, error_message: "Error: " + err });
  //   res.json({ data: arenas });
  // });
};
exports.getUnitsBankByArena = async (req, res) => {
  const arenaId = new ObjectId(req.params.arenaId);
  const start = performance.now();
  const piple = [
    {
      $match: {
        _id: arenaId,
      },
    },
    {
      $unwind: "$units",
    },
    {
      $lookup: {
        from: "centers",
        localField: "units",
        foreignField: "_id",
        as: "matched_centers",
      },
    },
    {
      $unwind: "$matched_centers",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        matched_centers: { $push: "$matched_centers" },
      },
    },
    {
      $unwind: "$matched_centers",
    },
    {
      $lookup: {
        from: "hativas",
        localField: "matched_centers._id",
        foreignField: "centerId",
        as: "hativas",
      },
    },
    {
      $unwind: "$hativas",
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
      $unwind: "$hativas.registerunits",
    },
    {
      $group: {
        _id: {
          centerId: "$matched_centers._id",
          hativaName: "$hativas.name",
          hativaId: "$hativas._id",
          centerName: "$matched_centers.name",
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

  const result = await Arenas.aggregate(piple);

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
      // console.log(hativa.hativaId);
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
  console.log(bankData);
  res.json({ data: bankData });
};

exports.getAllDataByArenaDashboard = (req, res) => {
  const arenaId = new ObjectId(req.params.data);
  const piple = [
    {
      $match: {
        _id: arenaId,
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "units",
        foreignField: "_id",
        as: "centersObj",
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "centersObj._id",
        foreignField: "centerId",
        as: "hativasCenters",
      },
    },
    {
      $lookup: {
        from: "reserves",
        localField: "centersObj._id",
        foreignField: "center",
        as: "centersReserves",
      },
    },
    {
      $lookup: {
        from: "reserves",
        localField: "hativasCenters._id",
        foreignField: "hativa",
        as: "hativasReserves",
      },
    },
    {
      $addFields:
        /**
         * newField: The new field name.
         * expression: The new field expression.
         */
        {
          title: "$name",
        },
    },
    // {
    //     $group: {
    //       _id: "$centersReserves",
    //       sumCount: {
    //         $sum: 1,
    //       },
    //       shampOpenCount: {
    //         $sum: {
    //           $cond: [
    //             {
    //               $eq: ["$centersReserves.shamap", true],
    //             },
    //             1,
    //             0,
    //           ],
    //         },
    //       },
    //       falseCount: {
    //         $sum: {
    //           $cond: [
    //             {
    //               $or: [
    //                 {
    //                   $eq: ["$centersReserves.shamap", false],
    //                 },
    //                 {
    //                   $eq: ["$centersReserves.shamap", null],
    //                 },
    //               ],
    //             },
    //             1,
    //             0,
    //           ],
    //         },
    //       },
    //       dailSentCount: {
    //         $sum: {
    //           $cond: [
    //             {
    //               $ifNull: ["$centersReserves.dailDate", false],
    //             },
    //             1,
    //             0,
    //           ],
    //         },
    //       },
    //     },
    //   },
  ];
  Arenas.aggregate(piple)
    .then((arenas) => {
      res.json({ data: arenas });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
  // Arenas.find((err, arenas) => {
  //   if (err)
  //     res.status(400).json({ error: true, error_message: "Error: " + err });
  //   res.json({ data: arenas });
  // });
};

exports.findById = (req, res) => {
  Arenas.findById(req.params.id, (err, arenas) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: arenas });
  });
};

exports.read = async (req, res) => {
  Arenas.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  Arenas.findOne({ name: req.body.name }, (err, arena) => {
    if (!arena || arena === undefined || arena === undefined) {
      console.log(err, arena);
      const name = req.body.name;
      const unitsArray = [];
      if (req.body.units.length !== 0) {
        req.body.units.forEach((element) => {
          const unit = element.id;
          unitsArray.push(unit);
        });
      }
      const units = unitsArray;

      const arenas = new Arenas({
        name,
        units,
      });
      arenas.save((err, data) => {
        if (err) {
          console.log("error is: ");
          console.log(err);
          return res
            .status(400)
            .json({ error: true, error_message: "Error: " + err });
        }
        res.json({ data: data });
      });
    } else {
      return res.json({
        error: true,
        error_message: "זירה זאת כבר קיימת במערכת",
      });
    }
  });
};

exports.update = (req, res) => {
  Arenas.findById(req.params.id).then((request) => {
    request.name = req.body.name;
    const unitsArray = [];
    if (req.body.units.length !== 0) {
      req.body.units.forEach((element) => {
        const unit = element.id;
        unitsArray.push(unit);
      });
    }
    request.units = unitsArray;

    request.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: "Error: " + err });
      }
      console.log(data);
      res.json({ error: false, error_message: "", data: data });
    });
  });
};

exports.remove = (req, res) => {
  Arenas.findByIdAndDelete(req.params.arenaId)
    .then((arenas) =>
      res.json({ error: false, error_message: "", data: arenas })
    )
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
