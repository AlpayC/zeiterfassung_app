import crypto from "crypto";
import e from "express";
import { Schema, model, mongoose } from "mongoose";

const isEmail = (string) => {
  const [name, domainWithTLD, ...rest] = string.split("@");
  if (rest.length || !name || !domainWithTLD) {
    return false;
  }

  const [domain, tld] = domainWithTLD.split(".");
  if (tld.length < 2 || !domain) return false;

  return true;
};

export const userSchema = new Schema({
  name: { type: String, required: [false, "Please specify your name"] },
  lastname: { type: String, required: [false, "Please specify your lastname"] },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} ist keine gültige Email-Adresse`,
    },
  },

  salt: { type: String, required: true, select: false },
  hash: { type: String, required: true, select: false },
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString("hex");

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

export const User = model("User", userSchema);

export default User;
