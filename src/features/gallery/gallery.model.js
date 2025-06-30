const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl:  { type: String, required: true },
  caption:   { type: String },
  uploadedAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
