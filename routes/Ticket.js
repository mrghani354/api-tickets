const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicketById,
  saveTicket,
  updateTicket,
  deleteTicket,
} = require("../app/controllers/TicketController");

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.post("/", saveTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
