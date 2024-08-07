const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
  getAllCentersInArenas,
  getUnitsBankByArena,
  getAllDataByArenaDashboard,
} = require("../../controllers/arenas/arenas.js");

// find spec
router.put("/remove/:arenaId", remove);
router.get("/getById/:id", read);
router.post("/add", create);
router.post("/update/:id", update);
router.get("/", find);
router.get("/getAllCentersInArenas", getAllCentersInArenas);
router.get("/get/UnitsBankByArena/:arenaId", getUnitsBankByArena);
router.get("/getAllDataByArena/:data", getAllDataByArenaDashboard);

module.exports = router;
