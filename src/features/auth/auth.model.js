const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['ADMIN','INSTITUTE','MEMBER','STUDENT'], default: 'STUDENT' },
  createdAt:  { type: Date, default: Date.now }
});

// Remove password when returning user objects
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Export existing model if already defined, otherwise define it
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
