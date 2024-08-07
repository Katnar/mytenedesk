const mongoose = require("mongoose");
const Center = require("../models/centers/centers");
const Hativa = require("../models/hativas/hativas");
const RegisterUnit = require("../models/registerunit/registerunit");

const method = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/AtalReservesDB?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    }
  );
  let centers = [];
  for (let i = 0; i < 100; i++) {
    centers.push({ name: `מרכז ${i + 1}` });
  }
  await Center.insertMany(centers);
  console.log("centers");

  let hativas = [];

  const centersList = await Center.find({});

  centersList.forEach((center, index) => {
    for (let i = 1; i <= 3; i++) {
      hativas.push({
        name: `חטיבה ${i} ${index + 1}`,
        centerId: center._id,
      });
    }
  });

  await Hativa.insertMany(hativas);
  console.log("hativas");

  const registerunits = [];

  const hativasList = await Hativa.find({});

  hativasList.forEach((hativa, index) => {
    registerunits.push({
      name: `יחידה ${index + 1} A`,
      hativaId: hativa._id,
    });

    registerunits.push({
      name: `יחידה ${index + 1} B`,
      hativaId: hativa._id,
    });

    registerunits.push({
      name: `יחידה ${index + 1} C`,
      hativaId: hativa._id,
    });
  });

  await RegisterUnit.insertMany(registerunits);
  console.log("units");
};

method();
