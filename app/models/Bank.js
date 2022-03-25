const mongoose = require("mongoose");
const { Schema } = mongoose;

const BankAccountSchema = new Schema(
  {
    bank_name: {
      type: String,
      require: [true, "Bank Name is required"],
    },
    card_type: {
      type: String,
      enum: ["debit", "credit"],
      default: "debit",
    },
    acc_number: {
      type: String,
      require: [true, "Account Number is required"],
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankAccounts", BankAccountSchema);
