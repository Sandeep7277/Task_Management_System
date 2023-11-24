const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//name, email, password,confirmPassword
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Password & Confirm Password does not match!",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //Encrypt the password before saving
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

module.exports = mongoose.model("User", userSchema);
