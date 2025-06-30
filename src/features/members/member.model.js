// src/features/members/member.model.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'INSTITUTE', 'MEMBER', 'STUDENT'],
      default: 'MEMBER',
    },
  },
  {
    timestamps: true,
  }
);

// Strip out the password whenever sending JSON
memberSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports =
  mongoose.models.Member || mongoose.model('Member', memberSchema);
