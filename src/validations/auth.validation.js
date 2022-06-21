const { check } = require("express-validator");

module.exports = {
  register: [
    // name
    check("fullname", "Name required").not().isEmpty(),
    check("fullname", "Name only can contains alphabet").isAlpha("en-US", {
      ignore: " ",
    }),
    check("fullname", "Name maximum length is 50 characters").isLength({
      max: 50,
    }),
    // email
    check("email", "Email required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("email", "Email maximum length is 50 characters").isLength({
      max: 50,
    }),
    // password
    check("password", "Password require 8 or more characters").isLength({
      min: 8,
    }),
    check(
      "password",
      "Password must include an lowercase character a-z"
    ).matches(/^(?=.*[a-z]).{8,}$/),
    check(
      "password",
      "Password must include an uppercase character A-Z"
    ).matches(/^(?=.*[A-Z]).{8,}$/),
    check("password", "Password must include a number 0-9").matches(
      /^(?=.*\d).{8,}$/
    ),
    check("password", "Password must include a special character").matches(
      /^(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),

    check("password", "Password can't above 100 characters").isLength({
      max: 100,
    }),
  ],

  login: [
    // email
    check("email", "Email required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    // password
    check("password", "Password required").not().isEmpty(),
  ],
};
