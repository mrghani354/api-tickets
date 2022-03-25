const Ticket = require("../models/Ticket");
const Bank = require("../models/Bank");

module.exports = {
  saveEvent: async (req, res) => {
    const { userid, ticketid } = req.body;
    try {
      const checkTicket = await Ticket.findById(ticketid);

      if (checkTicket) {
        const checkBankAcc = await Bank.findById(userid);
        if (!checkBankAcc) {
          res.status(204).json({
            success: false,
            message: "bank account not found",
          });
        }

        // updated status ticket
        const updateTicketStatus = await Ticket.updateOne(
          { _id: ticketid },
          {
            $set: {
              status: "DONE",
            },
          }
        );

        res.status(200).json({
          success: true,
          data: updateTicketStatus,
        });
      } else {
        res.status(204).json({
          success: false,
          message: "ticket expired or not exists",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
