const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Event name is required"],
    },
    count: {
      type: Number,
      require: [true, "Count ticket is required"],
    },
    price: {
      type: Number,
      require: [true, "Price ticket is required"],
    },
    show_date: {
      type: Date,
      default: Date.now,
      require: [true, "Date show ticket is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", EventSchema);
