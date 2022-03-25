const express = require("express");
const router = express.Router();

const {
  getBanks,
  getBankById,
  saveBank,
  updateBank,
  deleteBank,
} = require("../app/controllers/BankController");

router.get("/", getBanks);
router.get("/:id", getBankById);
router.post("/", saveBank);
router.patch("/:id", updateBank);
router.delete("/:id", deleteBank);

module.exports = router;
