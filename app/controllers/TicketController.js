const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { updateOne, count } = require("../models/Event");

module.exports = {
  getTickets: async (req, res) => {
    try {
      const rows = await Ticket.find();

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
  getTicketById: async (req, res) => {
    try {
      const row = await Ticket.findById(req.params.id);

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
  saveTicket: async (req, res) => {
    const { eventid, userid, quantity } = req.body;
    try {
      const event = await Event.findById(eventid);

      if (event) {
        if (event.count <= 1) {
          res.status(200).json({
            success: false,
            message: "Event seat is full",
          });
        }

        const _amount = event.price > 0 ? event.price * quantity : 0;
        let objTicket = {
          eventid,
          userid,
          quantity,
          amount: _amount,
        };

        const ticket = new Ticket(objTicket);

        const savedTicket = await ticket.save();

        if (savedTicket) {
          const updatedEvent = await Event.updateOne(
            { _id: eventid },
            {
              $set: {
                count: event.count - quantity,
              },
            }
          );

          if (!updatedEvent) {
            res.status(200).json({
              success: false,
              message: "Event failed updated",
            });
          }
        } else {
          res.status(200).json({
            success: false,
            message: "Ticket failed saved",
          });
        }
      }

      res.status(201).json({
        success: true,
        message: "Success",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  updateTicket: async (req, res) => {
    try {
      const row = await Ticket.findById(req.params.id);
      if (!row)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const updated = await Ticket.updateOne(
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
  deleteTicket: async (req, res) => {
    try {
      const row = await Ticket.findById(req.params.id);
      if (!row)
        return res
          .status(404)
          .json({ status: false, message: "data not found ..." });

      const deleted = await Ticket.deleteOne({ _id: req.params.id });

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
