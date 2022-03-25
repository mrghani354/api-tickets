const mongoose = require("mongoose");
const { Schema } = mongoose;
const Event = require("../models/Event");

const TicketSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: [true, "User is required"],
  },
  eventid: {
    type: Schema.Types.ObjectId,
    ref: "events",
    require: [true, "Event must be selected"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  status: {
    type: String,
    enum: ["NEW ORDER", "DONE", "CANCEL"],
    default: "NEW ORDER",
  },
  date_purchased: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

module.exports = mongoose.model("Tickets", TicketSchema);
