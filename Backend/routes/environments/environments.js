const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
} = require("../../controllers/environments/environments.js");

// find spec
router.put("/remove/:environmentId", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update/:id", update);
router.get("/", find);

module.exports = router;
