const express = require("express");
const {
  list,
  detail,
  update,
  updatePhoto,
} = require("../controllers/user.controller");
const upload = require("../middlewares/upload");
const runValidation = require("../middlewares/runValidation");
const router = express.Router();

router
  .get("/users", list)
  .get("/users/:id", detail)
  .put("/users/:id", update)
  .put("/users/:id/photo", upload, updatePhoto);

module.exports = router;
