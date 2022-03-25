const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;

const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      require: [true, "name is require"],
      maxlength: [225, "can't be more than 225 characters"],
      minlength: [3, "can't be less than 3 characters"],
    },
    email: {
      type: String,
      require: [true, "email is require"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
      maxlength: [15, "can't be more than 15 characters"],
      minlength: [3, "can't be less than 3 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      require: [true, "phone number is required"],
      maxlength: [13, "can't be more than 13 characters"],
      minlength: [9, "can't be less than 3 characters"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Users").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Users", UserSchema);
