const User = require("../models/User");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
