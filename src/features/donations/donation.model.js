const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName:  { type: String, required: true },
  amount:     { type: Number, required: true },
  via:        { type: String, enum: ['RAZORPAY','UPI'], required: true },
  donatedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
