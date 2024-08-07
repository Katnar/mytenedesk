const express = require("express");
const router = express.Router();
const {
  create,
  find,
  findReservesByCenterId,
  findReservesByArenaId,
  read,
  update,
  remove,
  getAllReservesNoShamp,
  getAllReservesByCenterNoShamp,
  getAllReservesByArenaNoShamp,
  getAllDataToDashboard,
  getAllDataByCenters,
  getAllDataByArenas,
  updateExcelReserves,
} = require("../../controllers/reserves/reserves.js");

// find spec
router.put("/remove/:id", remove);
router.get("/getReserve/:id", read);
router.post("/add", create);
router.post("/update/:id", update);
router.get("/", find);
router.get("/findReservesByCenterId/:centerId", findReservesByCenterId);
router.get("/findReservesByArenaId/:arenaId", findReservesByArenaId);
router.get("/getAllReservesNoShamp", getAllReservesNoShamp);
router.get(
  "/getAllReservesByCenterNoShamp/:centerId",
  getAllReservesByCenterNoShamp
);
router.get(
  "/getAllReservesByArenaNoShamp/:arenaId",
  getAllReservesByArenaNoShamp
);
router.get("/getAllDataToDashboard", getAllDataToDashboard);
router.get("/getAllDataByCenters/:centerId", getAllDataByCenters);
router.get("/getAllDataByArenas/:arenaId", getAllDataByArenas);
router.post("/update_excel_reserves", updateExcelReserves);

module.exports = router;
