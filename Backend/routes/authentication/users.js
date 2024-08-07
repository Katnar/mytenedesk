const express = require("express");
const router = express.Router();

const {
  find,
  getuserbyid,
  getuserbypersonalnumber,
  update,
  remove,
  removeArenaUsers,
  usersbyrole,
  getusersandsortbylevel,
  getinspectors,
  getEmilListSourceHoli,
} = require("../../controllers/authentication/user");

router.post("/getuserbyid", getuserbyid);
router.post("/getinspectors", getinspectors);
router.post("/user/getEmilListSourceHoli", getEmilListSourceHoli);

router.post("/getuserbypersonalnumber", getuserbypersonalnumber);

router.get("/users", find);
router.get("/usersLevel", getusersandsortbylevel);

router.put("/user/update/:id", update);

router.put("/user/remove/:userId", remove);

router.put("/user/removeArenaUsers/:arenaId", removeArenaUsers);

router.get("/usersbyrole/:admin", usersbyrole);

module.exports = router;
