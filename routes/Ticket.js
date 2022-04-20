const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicketById,
  saveTicket,
  updateTicket,
  deleteTicket,
  deleteAllTicket,
  getTicketByUserId,
  getTicketByEventId,
} = require("../app/controllers/TicketController");

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.get("/user/:id", getTicketByUserId);
router.get("/event/:id", getTicketByEventId);
router.post("/", saveTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.delete("/", deleteAllTicket);

module.exports = router;
