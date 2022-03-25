const Bank = require("../models/Bank");

module.exports = {
  getBanks: async (req, res) => {
    try {
      const rows = await Bank.find();

      res.json({
        success: true,
        data: rows,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getBankById: async (req, res) => {
    try {
      const row = await Bank.findById(req.params.id);

      res.json({
        success: true,
        data: row,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  saveBank: async (req, res) => {
    try {
      const bank = new Bank(req.body);
      const saved = await bank.save();

      res.status(201).json({
        success: true,
        data: saved,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  updateBank: async (req, res) => {
    try {
      const checkId = await Bank.findById(req.params.id);
      if (!checkId)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const updated = await Bank.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  deleteBank: async (req, res) => {
    try {
      const checkId = await Bank.findById(req.params.id);
      if (!checkId)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const deleted = await Bank.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        data: deleted,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
