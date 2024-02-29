const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "password can't be less than 6 charachters"],
    },
    firstName: { type: String, required: [true, "please Set a fisrt name"] },
    lastName: { type: String, required: [true, "please Set a last name"] },
    phone: { type: String },
    type: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal",
      lowercase: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.login = async function (reqEmail, reqPassword) {
  try {
    let userData = await this.findOne({ email: reqEmail });
    if (userData) {
      const passwordMatch = await bcrypt.compare(
        reqPassword,
        userData.password
      );
      if (passwordMatch) {
        return userData;
      } else {
        throw Error("invalid email or password");
      }
    } else {
      throw Error("User Not found");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
