const Event = require("../models/Event");

module.exports = {
  getEvents: async (req, res) => {
    try {
      const events = await Event.find();

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getEventsById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  saveEvent: async (req, res) => {
    try {
      const event = new Event(req.body);
      const saved = await event.save();

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
  updateEvent: async (req, res) => {
    try {
      const checkId = await Event.findById(req.params.id);
      if (!checkId)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const updated = await Event.updateOne(
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
  deleteEvent: async (req, res) => {
    try {
      const checkId = await Event.findById(req.params.id);
      if (!checkId)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const deleted = await Event.deleteOne({ _id: req.params.id });

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
  deleteAllEvent: async (req, res) => {
    try {
      const deleted = await Event.deleteMany({});

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
