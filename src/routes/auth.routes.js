const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const authValidation = require("../validations/auth.validation");
const runValidation = require("../middlewares/runValidation");
const router = express.Router();

router
  .post("/register", authValidation.register, runValidation, register)
  .post("/login", authValidation.login, runValidation, login);

module.exports = router;
