const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
  getUnitsBank,
  getUnitsBankByCenter,
} = require("../../controllers/centers/centers.js");

// find spec
router.put("/remove/:id", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update/:id", update);
router.get("/", find);
router.get("/get/UnitsBank", getUnitsBank);
// router.get("/get/UnitsBankByArena/:arenaId", getUnitsBankByArena);
router.get("/get/UnitsBankByCenter/:centerId", getUnitsBankByCenter);

module.exports = router;
