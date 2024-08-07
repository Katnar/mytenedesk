const Magadal = require("../models/magads/magadal");
const handleBanks = require("../call_functions/banks/handleBanks");
const handleBanksResult = require("../call_functions/banks/handleBanksResult");

exports.getMagadTree = async (req, res) => {
  const pipeline = [
    {
      $lookup: {
        from: "magads",
        localField: "_id",
        foreignField: "magadal",
        as: "magads",
      },
    },
    {
      $unwind: "$magads",
    },
    {
      $lookup: {
        from: "mkabazs",
        localField: "magads._id",
        foreignField: "magad",
        as: "magads.mkabazs",
      },
    },
    {
      $unwind: "$magads.mkabazs",
    },
    {
      $lookup: {
        from: "makats",
        localField: "magads.mkabazs._id",
        foreignField: "mkabaz",
        as: "magads.mkabazs.makats",
      },
    },
    {
      $group: {
        _id: {
          magadalId: "$_id",
          magadalName: "$name",
          magadId: "$magads._id",
          magadName: "$magads.name",
          mkabazId: "$magads.mkabazs._id",
          mkabazName: "$magads.mkabazs.name",
        },
        makats: { $first: "$magads.mkabazs.makats" },
      },
    },
    {
      $group: {
        _id: {
          magadalId: "$_id",
          magadalName: "$name",
          magadId: "$_id.magadId",
          magadName: "$_id.magadName",
        },
        mkabazs: {
          $push: {
            mkabazId: "$_id.mkabazId",
            mkabazName: "$_id.mkabazName",
            makats: "$makats",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          magadalId: "$_id.magadalId",
          magadalName: "$_id.magadalName",
        },
        magads: {
          $push: {
            magadId: "$_id.magadId",
            magadName: "$_id.magadName",
            mkabazs: "$mkabazs",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        magadalId: "$_id.magadalId.magadalId",
        magadalName: "$_id.magadalId.magadalName",
        magads: 1,
      },
    },
  ];
  const start = performance.now();

  const result = await Magadal.aggregate(pipeline);
  const makats = {};
  const mkabazs = {};
  const magads = {};
  const magadals = {};
  const all = {};

  result.forEach((magadal) => {
    // adding makats and mkabzas to dict
    magadal.magads.forEach((magad) => {
      magad.mkabazs.forEach((mkabaz) => {
        // adding makats to dict
        mkabaz.makats?.forEach((makat) => {
          makats[makat._id] = { name: makat.name, mkabazId: mkabaz.mkabazId };
        });

        // adding mkabaz to mkabaz dict
        mkabazs[mkabaz.mkabazId] = handleBanks(
          mkabazs[mkabaz.mkabazId],
          mkabaz.mkabazName,
          "magadId",
          magad.magadId,
          "_id",
          mkabaz.makats,
          "makats"
        );
      });
      // adding magads to dict
      magads[magad.magadId] = handleBanks(
        magads[magad.magadId],
        magad.magadName,
        "magadalId",
        magadal.magadalId,
        "mkabazId",
        magad.mkabazs,
        "mkabazs"
      );
    });

    magadals[magadal.magadalId] = handleBanks(
      magadals[magadal.magadalId],
      magadal.magadalName,
      null,
      null,
      "magadId",
      magadal.magads,
      "magads",
      true
    );
  });

  const final = handleBanksResult(result, "magadalId");
  //! one of those is redandent need to see who
  const sum = {};
  const Top = {};
  Object.keys(magadals).map((key) => {
    {
      sum[magadals[key].name] = [
        ...new Set(
          magadals[key].magads
            .map((el) => magads[el])
            .map((item) => item)
            .map((el) => el.mkabazs)
            .flat()
            .map((mkabaz) => mkabazs[mkabaz].makats)
            .flat()
        ),
      ];
      Top[key] = sum[magadals[key].name];
    }
  });
  const end = performance.now();

  console.log(`time to calc tenetree ${~~(end - start)} ms`);
  return { makats, mkabazs, magads, magadals, final, sum, Top };
};
