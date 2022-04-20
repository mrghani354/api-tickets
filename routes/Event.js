const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventsById,
  saveEvent,
  updateEvent,
  deleteEvent,
  deleteAllEvent,
} = require("../app/controllers/EventController");

router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/", saveEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.delete("/", deleteAllEvent);

module.exports = router;
