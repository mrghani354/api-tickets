const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventsById,
  saveEvent,
  updateEvent,
  deleteEvent,
} = require("../app/controllers/EventController");

router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/", saveEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
