const { validationResult } = require("express-validator");
const { failed } = require("../helpers/response");

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req).array({ onlyFirstError: true });

    // jika validasi gagal
    if (errors.length) {
      failed(res, 400, errors, "Validation Failed");
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    failed(res, 500, error.message, "Internal Server Error");
  }
};
