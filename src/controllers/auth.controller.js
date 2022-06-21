const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const { success, failed } = require("../helpers/response");
const jwtToken = require("../helpers/generateJwtToken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, fullname } = req.body;
      const check = await authModel.login(email);
      if (check.rowCount) {
        failed(res, 500, "Email already used", "Register Failed");
        return;
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, 500, "failed hash password", "Register Failed");
        }
        const data = {
          id: uuidv4(),
          email,
          password: hash,
          fullname,
        };
        authModel
          .input(data)
          .then((result) => {
            success(res, 200, result.rows[0], "Register Success");
          })
          .catch((err) => {
            failed(res, 500, err, "Register Failed");
          });
      });
    } catch (err) {
      failed(res, 500, err, "Register Failed");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModel.login(email);
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
            level: user.rows[0].level,
          });
          const data = {
            token: jwt,
            id: user.rows[0],
          };
          success(res, 200, data, "Login Success");
          return;
        }
      }
      failed(res, 500, "Email or Password Wrong", "Login Failed");
    } catch (err) {
      failed(res, 500, err, "Login Failed");
    }
  },
};
