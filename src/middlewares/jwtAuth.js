const jwt = require("jsonwebtoken");
const { failed } = require("../helpers/response");
const { JWT_SECRET } = require("../helpers/env");

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, JWT_SECRET);

    req.APP_DATA = { tokenDecoded: decoded };
    next();
  } catch (error) {
    failed(res, 500, "Token Invalid", "Unauthorized");
  }
};
