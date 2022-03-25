const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const user = new User(req.body);

      const saved = await user.save();
      res.status(201).json({
        success: true,
        data: saved,
      });
    } catch (error) {
      res.status(422).json({
        message: error.message,
        fields: error.errors,
      });
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    await User.findOne({ email })
      .then((user) => {
        if (user) {
          const checkPassword = bcrypt.compareSync(password, user.password);

          if (!checkPassword) {
            res.status(403).json({
              message: "incorrect password",
            });
          }

          const token = jwt.sign({ user }, process.env.APP_KEY);

          res.status(200).json({
            success: true,
            token,
          });
        } else {
          res.status(403).json({
            message: "email is not registered",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || `Internal server error`,
        });
      });

    next();
  },
};
