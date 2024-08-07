const User = require("../../models/authentication/user.model");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

exports.getuserbyid = (req, res) => {
  User.findById(req.body.userid).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: true, error_message: "Error: משתמש לא נמצא" + err });
    } else {
      res.send({ data: user });
    }
  });
};

exports.getusersandsortbylevel = (req, res) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((orders) => res.json({ data: orders }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getuserbypersonalnumber = (req, res) => {
  User.findOne(req.body.personalnumber).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: true, error_message: "Error: משתמש לא נמצא" + err });
    } else {
      res.send({ data: user });
    }
  });
};

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
    {
      $lookup: {
        from: "arenas",
        localField: "arena",
        foreignField: "_id",
        as: "arenas",
      },
    },
  ];
  User.aggregate(piple)
    .then((orders) => {
      res.json({ data: orders });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
  // User.find()
  //   .then((orders) => res.json({ data: orders }))
  //   .catch((err) =>
  //     res.status(400).json({ error: true, error_message: "Error: " + err })
  //   );
};

exports.update = async (req, res) => {
  console.log(req.params, req.body);
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) {
    res
      .status(404)
      .json({ error: true, error_message: "Error: שגיאה בעדכון" + err });
  }
  const piple = [
    { $match: { _id: new ObjectId(req.params.id) } },
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
        from: "arenas",
        localField: "arena",
        foreignField: "_id",
        as: "arenas",
      },
    },
  ];
  User.aggregate(piple).then((updateUser) => {
    res.json({ error: false, error_message: "", data: updateUser[0] });
  });
};

exports.remove = (req, res) => {
  // console.log(req.body); //prints {}
  console.log(req.params); //prints { userId: '608e42b1cedc2a3a18492ae5' }
  User.findByIdAndDelete({ _id: req.params.userId })
    .then((orders) =>
      res.json({ error: false, error_message: "", data: orders })
    )
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.removeArenaUsers = (req, res) => {
  // console.log(req.body); //prints {}
  console.log(req.params);
  const arenaId = req.params.arenaId;
  User.deleteMany({ arena: arenaId })
    .then((orders) =>
      res.json({ error: false, error_message: "", data: orders })
    )
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.usersbyrole = (req, res) => {
  User.find({ role: req.params.role })
    .then((orders) => res.json({ data: orders }))
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getEmilListSourceHoli = (req, res) => {
  User.find({ role: "3", source_holi: req.body.source_holi })
    .then((u) => {
      const users = u.map((user) => {
        return `${user.personalnumber}@army.idf.il`;
      });
      console.log(u);
      return res.json({ data: users });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};

exports.getinspectors = (req, res) => {
  User.find({
    $or: [
      { $and: [{ admin: "1" }, { adminType: "1" }] },
      { $and: [{ admin: "2" }, { adminType: "2" }] },
    ],
  })
    .sort({ admin: -1, adminType: -1 })
    .exec()
    .then((u) => {
      const users = u.map((user) => {
        return {
          id: user._id,
          personalnumber: user.personalnumber,
          info: `${user.firstName} ${user.lastName} - ${user.personalnumber}`,
        };
      });
      console.log(u);
      return res.json({ data: users });
    })
    .catch((err) =>
      res.status(400).json({ error: true, error_message: "Error: " + err })
    );
};
