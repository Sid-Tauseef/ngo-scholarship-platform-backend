// // src/features/users/users.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  role:      { 
    type: String, 
    enum: ['ADMIN','INSTITUTE','MEMBER','STUDENT'], 
    default: 'STUDENT' 
  },
  createdAt: { type: Date, default: Date.now }
});

// Hide password in any JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// // Export existing model if already defined, otherwise define it
module.exports = mongoose.models.User || mongoose.model('User', userSchema);


// src/features/users/user.model.js
// const mongoose = require('mongoose');

// const profileSchemas = {
//   MEMBER: new mongoose.Schema({
//     // put any member-only fields here, e.g. department
//   }, { _id: false }),
//   INSTITUTE: new mongoose.Schema({
//     // institute-only fields, e.g. institutionName
//   }, { _id: false }),
//   STUDENT: new mongoose.Schema({
//     rollNumber: { type: String, required: true, trim: true }
//     // plus any other student-only fields
//   }, { _id: false }),
// };

// const userSchema = new mongoose.Schema({
//   name:      { type: String, required: true, trim: true },
//   email:     { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
//   password:  { type: String, required: true },
//   role:      { 
//     type: String, 
//     enum: ['ADMIN','INSTITUTE','MEMBER','STUDENT'], 
//     required: true 
//   },
//   profile:   { type: mongoose.Schema.Types.Mixed, default: {} },
// }, { timestamps: true });

// // Hide password on JSON output
// userSchema.methods.toJSON = function() {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

// module.exports = mongoose.models.User || mongoose.model('User', userSchema);
