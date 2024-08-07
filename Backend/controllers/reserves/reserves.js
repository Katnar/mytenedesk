const Reserves = require("../../models/reserves/reserves");
const { ObjectId } = require("mongodb");
const Arenas = require("../../models/arenas/arenas");
const Frames = require("../../models/frames/frames");
const Centers = require("../../models/centers/centers");
const Hativas = require("../../models/hativas/hativas");
const RegisterUnits = require("../../models/registerunit/registerunit");
const Occupations = require("../../models/occupations/occupations");
const References = require("../../models/refrence/refrence");
const { alfonMapping, ityazvootMapping, haiganMapping } = require("./mapping");

exports.find = (req, res) => {
  const piple = [
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    // {
    //   $addFields: {
    //     centerName: {
    //       $arrayElemAt: ["$centers.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    // {
    //   $addFields: {
    //     hativaName: {
    //       $arrayElemAt: ["$hativas.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    // {
    //   $addFields: {
    //     frameName: {
    //       $arrayElemAt: ["$frames.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    // {
    //   $addFields: {
    //     registerUnitName: {
    //       $arrayElemAt: ["$registerUnits.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          createdAt: -1,
        },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );

  // Reserves.find((err, reserves) => {
  //   if (err)
  //     res.status(400).json({ error: true, error_message: "Error: " + err });
  //   res.json({ data: reserves });
  // }).sort({ createdAt: -1 });
};
exports.findReservesByCenterId = (req, res) => {
  const centerId = new ObjectId(req.params.centerId);
  const piple = [
    {
      $match: {
        center: centerId,
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    // {
    //   $addFields: {
    //     centerName: {
    //       $arrayElemAt: ["$centers.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    // {
    //   $addFields: {
    //     hativaName: {
    //       $arrayElemAt: ["$hativas.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    // {
    //   $addFields: {
    //     frameName: {
    //       $arrayElemAt: ["$frames.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    // {
    //   $addFields: {
    //     registerUnitName: {
    //       $arrayElemAt: ["$registerUnits.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          createdAt: -1,
        },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );

  // Reserves.find((err, reserves) => {
  //   if (err)
  //     res.status(400).json({ error: true, error_message: "Error: " + err });
  //   res.json({ data: reserves });
  // }).sort({ createdAt: -1 });
};
exports.findReservesByArenaId = async (req, res) => {
  const arenaId = new ObjectId(req.params.arenaId);
  const centerArray = await Arenas.findOne({ _id: arenaId });
  const piple = [
    {
      $match: {
        center: {
          $in: centerArray.units,
        },
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    // {
    //   $addFields: {
    //     centerName: {
    //       $arrayElemAt: ["$centers.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    // {
    //   $addFields: {
    //     hativaName: {
    //       $arrayElemAt: ["$hativas.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    // {
    //   $addFields: {
    //     frameName: {
    //       $arrayElemAt: ["$frames.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    // {
    //   $addFields: {
    //     registerUnitName: {
    //       $arrayElemAt: ["$registerUnits.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          createdAt: -1,
        },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );

  // Reserves.find((err, reserves) => {
  //   if (err)
  //     res.status(400).json({ error: true, error_message: "Error: " + err });
  //   res.json({ data: reserves });
  // }).sort({ createdAt: -1 });
};
exports.getAllReservesNoShamp = (req, res) => {
  const piple = [
    {
      $match: {
        shamap: null,
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
exports.getAllReservesByCenterNoShamp = (req, res) => {
  const centerId = new ObjectId(req.params.centerId);
  const piple = [
    {
      $match: {
        shamap: null,
        center: centerId,
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getAllReservesByArenaNoShamp = async (req, res) => {
  const arenaId = new ObjectId(req.params.arenaId);
  const centerArray = await Arenas.findOne({ _id: arenaId });
  const piple = [
    {
      $match: {
        shamap: null,
        center: {
          $in: centerArray.units,
        },
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    {
      $lookup: {
        from: "registerunits",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getAllDataToDashboard = (req, res) => {
  const clockLevel = req.query.clockLevel;
  const clockName = req.query.clockName;
  // console.log("clockLevel: ", clockLevel);
  // console.log("clockName: ", clockName);
  let piple = [];
  if (!clockLevel || clockLevel == "all") {
    piple = [
      {
        $group: {
          _id: "$center",
          sumCount: {
            $sum: 1,
          },
          shampOpenCount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$shamap", true],
                },
                1,
                0,
              ],
            },
          },
          falseCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    {
                      $eq: ["$shamap", false],
                    },
                    {
                      $eq: ["$shamap", null],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          presetDateCount: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$presetDate", false],
                },
                1,
                0,
              ],
            },
          },
          presetDateFalseCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    {
                      $eq: ["$presetDate", false],
                    },
                    {
                      $eq: ["$presetDate", null],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          dailSentCount: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$dailDate", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "centers",
          localField: "_id",
          foreignField: "_id",
          as: "centers",
        },
      },
      {
        $addFields: {
          title: {
            $arrayElemAt: ["$centers.name", 0],
          },
        },
      },
      {
        $lookup: {
          from: "hativas",
          localField: "_id",
          foreignField: "centerId",
          as: "hativasArray",
        },
      },
      {
        $sort: {
          "centers.name": 1,
        },
      },
    ];
  } else if (clockLevel == "hativas") {
    piple = [
      {
        $group: {
          _id: "$hativa",
          sumCount: {
            $sum: 1,
          },
          shampOpenCount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$shamap", true],
                },
                1,
                0,
              ],
            },
          },
          falseCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    {
                      $eq: ["$shamap", false],
                    },
                    {
                      $eq: ["$shamap", null],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          dailSentCount: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$dailDate", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "hativas",
          localField: "_id",
          foreignField: "_id",
          as: "hativas",
        },
      },
      {
        $match: {
          "hativas.centerId": ObjectId(clockName),
        },
      },
      {
        $addFields: {
          title: {
            $arrayElemAt: ["$hativas.name", 0],
          },
        },
      },
      {
        $lookup: {
          from: "registerunits",
          localField: "_id",
          foreignField: "hativaId",
          as: "registerunitsArray",
        },
      },
    ];
  } else if (clockLevel == "registerUnit") {
    piple = [
      {
        $group: {
          _id: "$registerUnit",
          sumCount: {
            $sum: 1,
          },
          shampOpenCount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$shamap", true],
                },
                1,
                0,
              ],
            },
          },
          falseCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    {
                      $eq: ["$shamap", false],
                    },
                    {
                      $eq: ["$shamap", null],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          dailSentCount: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$dailDate", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "registerunits",
          localField: "_id",
          foreignField: "_id",
          as: "registerunits",
        },
      },
      {
        $addFields: {
          title: {
            $arrayElemAt: ["$registerunits.name", 0],
          },
        },
      },
      {
        $match: {
          "registerunits.hativaId": ObjectId(clockName),
        },
      },
      {
        $sort: {
          "registerunits.name": 1,
        },
      },
    ];
  }
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getAllDataByCenters = (req, res) => {
  const centerId = new ObjectId(req.params.centerId);
  const piple = [
    {
      $match: {
        $expr: {
          $eq: ["$center", centerId],
        },
      },
    },
    {
      $group: {
        _id: "$center",
        sumCount: {
          $sum: 1,
        },
        shampOpenCount: {
          $sum: {
            $cond: [
              {
                $eq: ["$shamap", true],
              },
              1,
              0,
            ],
          },
        },
        falseCount: {
          $sum: {
            $cond: [
              {
                $or: [
                  {
                    $eq: ["$shamap", false],
                  },
                  {
                    $eq: ["$shamap", null],
                  },
                ],
              },
              1,
              0,
            ],
          },
        },
        dailSentCount: {
          $sum: {
            $cond: [
              {
                $ifNull: ["$dailDate", false],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "_id",
        foreignField: "_id",
        as: "centers",
      },
    },
    {
      $addFields: {
        title: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "_id",
        foreignField: "centerId",
        as: "hativasArray",
      },
    },
    {
      $sort: {
        "centers.name": 1,
      },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getAllDataByArenas = async (req, res) => {
  const arenaId = new ObjectId(req.params.arenaId);
  const centerArray = await Arenas.findOne({ _id: arenaId });
  const piple = [
    {
      $match: {
        center: {
          $in: centerArray.units,
        },
      },
    },
    {
      $group: {
        _id: "$arena",
        sumCount: {
          $sum: 1,
        },
        shampOpenCount: {
          $sum: {
            $cond: [
              {
                $eq: ["$shamap", true],
              },
              1,
              0,
            ],
          },
        },
        falseCount: {
          $sum: {
            $cond: [
              {
                $or: [
                  {
                    $eq: ["$shamap", false],
                  },
                  {
                    $eq: ["$shamap", null],
                  },
                ],
              },
              1,
              0,
            ],
          },
        },
        dailSentCount: {
          $sum: {
            $cond: [
              {
                $ifNull: ["$dailDate", false],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "_id",
        foreignField: "_id",
        as: "centers",
      },
    },
    {
      $addFields: {
        title: centerArray.name,
      },
    },
    {
      $lookup: {
        from: "hativas",
        localField: "_id",
        foreignField: "centerId",
        as: "hativasArray",
      },
    },
    {
      $sort: {
        "centers.name": 1,
      },
    },
  ];
  Reserves.aggregate(piple)
    .then((reserves) => {
      res.json({ data: reserves });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.findById = (req, res) => {
  Reserves.findById(req.params.id, (err, reserves) => {
    if (err)
      res.status(400).json({ error: true, error_message: "Error: " + err });
    res.json({ data: reserves });
  });
};

exports.read = async (req, res) => {
  Reserves.findById(req.params.id)
    .then((request) => res.json({ data: request }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.create = (req, res) => {
  console.log(req.body.personalNumber);
  Reserves.findOne(
    { personalNumber: req.body.personalNumber },
    (err, reserve) => {
      console.log(err, reserve);
      if (!reserve || reserve === null || reserve === undefined) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const personalNumber = req.body.personalNumber;
        const personalId = req.body.personalId;
        const rank = req.body.rank;
        const serviceType = req.body.serviceType;
        const frame = req.body.frame;
        const registerUnit = req.body.registerUnit;
        const center = req.body.center;
        const hativa = req.body.hativa;
        const occupation = req.body.occupation;
        const plugaCode = req.body.plugaCode;
        const manningType = req.body.manningType;
        const dailDate = req.body.dailDate;
        const mainStatus = req.body.mainStatus;
        const subStatus = req.body.subStatus;
        const shamap = req.body.shamap;
        const isAppended = req.body.isAppended;
        const presetDate = req.body.presetDate;
        const releaseDate = req.body.releaseDate;
        const centerRef = req.body.centerRef;
        const arenaNotes = req.body.arenaNotes;
        const centerNotes = req.body.centerNotes;
        const isValid = req.body.isValid;
        const isDisconnected = req.body.isDisconnected;
        const absentee = req.body.absentee;
        const welfare = req.body.welfare;

        const reserves = new Reserves({
          firstName,
          lastName,
          personalNumber,
          personalId,
          rank,
          serviceType,
          frame,
          registerUnit,
          center,
          hativa,
          occupation,
          plugaCode,
          manningType,
          dailDate,
          mainStatus,
          subStatus,
          shamap,
          isAppended,
          presetDate,
          releaseDate,
          centerRef,
          arenaNotes,
          centerNotes,
          isValid,
          isDisconnected,
          absentee,
          welfare,
        });
        reserves.save(async (err, addedReserve) => {
          if (err) {
            console.log("error is: ");
            console.log(err);
            return res
              .status(400)
              .json({ error: true, error_message: "Error: " + err });
          }
          const returnReserve = await aggerateReserve(req.body.personalNumber);
          res.json({ error: false, error_message: "", data: returnReserve });
        });
      } else {
        return res.json({
          error: true,
          error_message: "איש מילואים קיים", // "איש מילואים קיים",
        });
      }
    }
  );
};

const aggerateReserve = async (personalNumber) => {
  const piple = [
    {
      $match: {
        personalNumber: personalNumber,
      },
    },
    {
      $lookup: {
        from: "centers",
        localField: "center",
        foreignField: "_id",
        as: "centers",
      },
    },
    // {
    //   $addFields: {
    //     centerName: {
    //       $arrayElemAt: ["$centers.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "hativas",
        localField: "hativa",
        foreignField: "_id",
        as: "hativas",
      },
    },
    // {
    //   $addFields: {
    //     hativaName: {
    //       $arrayElemAt: ["$hativas.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "frames",
        localField: "frame",
        foreignField: "_id",
        as: "frames",
      },
    },
    // {
    //   $addFields: {
    //     frameName: {
    //       $arrayElemAt: ["$frames.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "hativas",
        localField: "registerUnit",
        foreignField: "_id",
        as: "registerUnits",
      },
    },
    // {
    //   $addFields: {
    //     registerUnitName: {
    //       $arrayElemAt: ["$registerUnits.name", 0],
    //     },
    //   },
    // },
    {
      $lookup: {
        from: "occupations",
        localField: "occupation",
        foreignField: "_id",
        as: "occupations",
      },
    },
    {
      $addFields: {
        occupationprofessionCode: {
          $arrayElemAt: ["$occupations.professionCode", 0],
        },
        occupationDescription: {
          $arrayElemAt: ["$occupations.description", 0],
        },
        registerUnitName: {
          $arrayElemAt: ["$registerUnits.name", 0],
        },
        frameName: {
          $arrayElemAt: ["$frames.name", 0],
        },
        hativaName: {
          $arrayElemAt: ["$hativas.name", 0],
        },
        centerName: {
          $arrayElemAt: ["$centers.name", 0],
        },
      },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          createdAt: -1,
        },
    },
  ];
  const arrayFound = await Reserves.aggregate(piple);
  return arrayFound[0];
};
exports.update = (req, res) => {
  Reserves.findById(req.params.id).then((request) => {
    request.firstName = req.body.firstName;
    request.lastName = req.body.lastName;
    request.personalNumber = req.body.personalNumber;
    request.personalId = req.body.personalId;
    request.rank = req.body.rank;
    request.serviceType = req.body.serviceType;
    request.frame = req.body.frame;
    request.registerUnit = req.body.registerUnit;
    request.center = req.body.center;
    request.hativa = req.body.hativa;
    request.occupation = req.body.occupation;
    request.plugaCode = req.body.plugaCode;
    request.manningType = req.body.manningType;
    request.dailDate = req.body.dailDate;
    request.mainStatus = req.body.mainStatus;
    request.subStatus = req.body.subStatus;
    request.shamap = req.body.shamap;
    request.isAppended = req.body.isAppended;
    request.presetDate = req.body.presetDate;
    request.releaseDate = req.body.releaseDate;
    request.centerRef = req.body.centerRef;
    request.arenaNotes = req.body.arenaNotes;
    request.centerNotes = req.body.centerNotes;
    request.isValid = req.body.isValid;
    request.isDisconnected = req.body.isDisconnected;
    request.absentee = req.body.absentee;
    request.welfare = req.body.welfare;

    request.save(async (err, updatedData) => {
      if (err) {
        return res
          .status(400)
          .json({ error: true, error_message: "Error: " + err });
      }
      const returnReserve = await aggerateReserve(req.body.personalNumber);
      res.json({ data: returnReserve });
    });
  });
};

exports.remove = (req, res) => {
  Reserves.findByIdAndDelete(req.params.id)
    .then((deletedReserve) =>
      res.json({ error: false, error_message: "", data: deletedReserve })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ error: true, error_message: "Error: " + err.message })
    );
};

updateReserveToObjectId = async (reserve, type) => {
  // frame , registerUnit , center , hativa , occupation 
  if (!reserve.personalNumber || !reserve.personalId) {
    return null;
  }

  const { frame, registerUnit, center, hativa, occupation, centerRef } =
    reserve;

  try {
    // need ObjectId values for the fields that need to be converted
    let frameId, registerUnitId, centerId, hativaId, occupationId;
    if (type == "alfon") {
      frameId = frame ? await Frames.findOne({ name: frame }) : null;
      registerUnitId = registerUnit
        ? await RegisterUnits.findOne({ name: registerUnit })
        : null;
      centerId = canter ? await Centers.findOne({ name: center }) : null;
      hativaId = hativa ? await Hativas.findOne({ name: hativa }) : null;
      occupationId = occupation
        ? await Occupations.findOne({ description: occupation })
        : null;
    }
    let dailDate, presetDate, envCodeINT;
    if (type == "haigan" && reserve.dailDate) {
      dailDate = new Date(reserve.dailDate);
    }
    if (type == "ityazvoot" && reserve.presetDate && reserve.envCode) {
      presetDate = new Date(reserve.presetDate);
      centerId = centerRef
        ? await References.findOne({ code: centerRef })
        : null;
      envCodeINT = parseInt(reserve.envCode);
      if (centerId == null) {
        console.log("envCode doesnt exist");
        return null;
      }
    }
    const newReserve = {
      ...reserve,
      frame: type == "alfon" ? (frame ? frameId?._id : null) : null,
      registerUnit:
        type == "alfon" ? (registerUnit ? registerUnitId?._id : null) : null,
      center: center
        ? type == "alfon"
          ? centerId?._id
          : type == "ityazvoot"
          ? centerId?.center
          : null
        : null,
      hativa: type == "alfon" ? (hativa ? hativaId?._id : null) : null,
      occupation:
        type == "alfon" ? (occupation ? occupationId?._id : null) : null,
      dailDate: type == "haigan" && dailDate ? dailDate : null,
      presetDate: type == "ityazvoot" && presetDate ? presetDate : null,
      envCode: type == "haigan" && envCodeINT ? envCodeINT : null,
    };
    removeNullFields(newReserve);
    return newReserve;
  } catch (error) {
    console.error("Error converting fields to ObjectId:", error);
    throw error; // Propagate the error to the caller
  }
};

removeNullFields = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
};

exports.updateExcelReserves = async (req, res) => {
  const reservesData = req.body.excel;
  const dataType = req.body.type;
  let message;
  if (dataType === "ityazvoot") {
    message = "קובץ התייצבות";
  } else if (dataType === "alfon") {
    message = "קובץ אלפון";
  } else if (dataType === "haigan") {
    message = "קובץ חייגן";
  }
  const curMapping =
    dataType == "ityazvoot"
      ? ityazvootMapping
      : dataType == "alfon"
      ? alfonMapping
      : haiganMapping;
  //if not ityazvoot or alfon its haigan
  const reconstructedArray = reservesData.map((obj) => {
    const reconstructedObj = {};
    for (const hebrewField in obj) {
      const englishField = curMapping[hebrewField];
      if (englishField) {
        reconstructedObj[englishField] = obj[hebrewField];
      }
    }
    return reconstructedObj;
  });

  for (const reserve of reconstructedArray) {
    const curPersonalNumber = reserve.personalNumber;

    // check if the reserve with this personalNumber exists
    const existingReserve = await Reserves.findOne({
      personalNumber: curPersonalNumber,
    });
    if (existingReserve) {
      // if exists, update the existing document
      const updateReserve = await updateReserveToObjectId(reserve, dataType);
      if (updateReserve != null) {
        //in ityazvoot file, not updating center, but its still required
        dataType == "ityazvoot" &&
          delete updateReserve.center &&
          delete updateReserve.centerRef;
        await Reserves.updateOne(
          { personalNumber: curPersonalNumber },
          updateReserve
        );
        console.log(`Updated reserve with personalNumber ${curPersonalNumber}`);
      }
    } else {
      // if not exists, create a new document
      const updateReserve = await updateReserveToObjectId(reserve, dataType);
      if (updateReserve != null) {
        dataType == "ityazvoot" && delete updateReserve.centerRef;
        // firstName: { type: String, required: true },
        // lastName: { type: String, required: true },
        // personalNumber: { type: String, required: true },
        // personalId: { type: String, required: true },
        if (
          reserve.firstName &&
          reserve.lastName &&
          reserve.personalNumber &&
          reserve.personalId
        ) {
          await Reserves.create(updateReserve);
          console.log(
            `Created new reserve with personalNumber ${curPersonalNumber}`
          );
        } else {
          console.log(
            `cant add new user because he is missing required data - personalNumber : ${
              reserve.personalNumber
            } - missing data is : 
            ${!reserve.firstName ? "firstName, " : ""}
            ${!reserve.lastName ? "lastName, " : ""}
            ${!reserve.personalNumber ? "personalNumber, " : ""}
            ${!reserve.personalId ? "personalId, " : ""}`
          );
        }
      }
    }
  }
  res.status(200).json({ data: message });
};
